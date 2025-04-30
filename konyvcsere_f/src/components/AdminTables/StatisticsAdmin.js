import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBar,
  RadialBarChart
} from 'recharts';
import useApiContext from '../../contexts/ApiContext';
import useAuthContext from '../../contexts/AuthContext';
import AdminSummaryStats from './AdminSummaryStats';

export default function StatisticsAdmin() {
  const { user } = useAuthContext();
  const {
    getRegistrationsStat,
    getLoginsStat,
    getUploadsByCategoryStat,
    getUploadsTrendStat,
    getClosedExchangesStat,
    getExchangeSuccessRatioStat,
    getAvgExchangeTimeStat,
    getTopBooksStat,
    getTopAuthorsGenresStat,
    getMostExchangedCity,
  } = useApiContext();

  // State hooks for stats
  const [regStats, setRegStats] = useState([]);
  const [loginStats, setLoginStats] = useState([]);
  const [uploadsByCat, setUploadsByCat] = useState([]);
  const [uploadTrend, setUploadTrend] = useState([]);
  const [closedEx, setClosedEx] = useState([]);
  const [successRatio, setSuccessRatio] = useState([]);
  const [avgTime, setAvgTime] = useState(null);
  const [topBooks, setTopBooks] = useState([]);
  const [topAG, setTopAG] = useState({ authors: [], genres: [] });
  const [mostCity, setMostCity] = useState(null);

  // Interval state
  const [intervalReg, setIntervalReg] = useState('daily');
  const [intervalLogin, setIntervalLogin] = useState('daily');
  const [intervalUploadTrend, setIntervalUploadTrend] = useState('daily');
  const [intervalClosedEx, setIntervalClosedEx] = useState('daily');

  // Fetch all stats when user or intervals change
  useEffect(() => {
    if (!user) return;
    async function fetchStats() {
      setRegStats(await getRegistrationsStat(intervalReg));
      setLoginStats(await getLoginsStat(intervalLogin));
      setUploadsByCat(await getUploadsByCategoryStat());
      setUploadTrend(await getUploadsTrendStat(intervalUploadTrend));
      setClosedEx(await getClosedExchangesStat(intervalClosedEx));
      setSuccessRatio(await getExchangeSuccessRatioStat());
      const avg = await getAvgExchangeTimeStat();
      setAvgTime(avg.avg_hours);
      setTopBooks(await getTopBooksStat());
      setTopAG(await getTopAuthorsGenresStat());
      const cityRes = await getMostExchangedCity();
      setMostCity(cityRes[0] || null);
    
    }
    fetchStats();
  }, [user, intervalReg, intervalLogin, intervalUploadTrend, intervalClosedEx]);

  const data = [
    { name: 'Átlagos csereidő', value: avgTime || 0 }
  ];


  return (
    <div className="stats-container">
      <h1 className="page-title">Admin Statisztikák</h1>
      <p className="intro">
      Üdvözöllek {user?.full_name ? `, ${user.full_name}` : ""}!
        Itt áttekintheted a felhasználói aktivitást, a könyvfeltöltéseket és a cserefolyamatokat különböző bontásokban.
      </p>

       <hr className="section-divider" />
       
      <AdminSummaryStats />
    <Container fluid>

      <Card.Title className="mb-4"><p className="intro">Átlagos Csereidő</p></Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart
                  cx="50%" cy="50%" innerRadius="70%" outerRadius="100%"
                  barSize={20} data={data} startAngle={180} endAngle={0}
                >
                  <RadialBar
                    minAngle={15} background clockWise dataKey="value"
                    fill="#8884d8"
                  />
                  <Legend
                    iconSize={0}
                    layout="vertical"
                    verticalAlign="middle"
                    align="center"
                    formatter={() => avgTime !== null ? `${avgTime} óra` : 'Betöltés...'}
                  />
                  <Tooltip formatter={val => `${val} óra`} />
                </RadialBarChart>
              </ResponsiveContainer>

      {/* Trend , Category */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Regisztrációk trendje</Card.Title>
              <Form.Select value={intervalReg} onChange={e => setIntervalReg(e.target.value)} className="mb-2">
                <option value="daily">Napi</option>
                <option value="weekly">Heti</option>
                <option value="monthly">Havi</option>
                <option value="yearly">Éves</option>
              </Form.Select>
              <ResponsiveContainer height={200} width="100%">
                <LineChart data={regStats}>
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Feltöltések kategóriánként</Card.Title>
              <ResponsiveContainer height={200} width="100%">
                <BarChart data={uploadsByCat}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Ratio, Top Lists */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Sikeres vs. Sikertelen cserék</Card.Title>
              <ResponsiveContainer height={200} width="100%">
                <PieChart>
                  <Pie data={successRatio} dataKey="value" nameKey="label" outerRadius={80}>
                    {successRatio.map((entry, idx) => (
                      <Cell key={idx} fill={[ '#0088FE', '#FF8042' ][idx % 2]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Legnépszerűbb könyvek</Card.Title>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr><th>Könyv</th><th>Keresések</th></tr>
                </thead>
                <tbody>
                  {topBooks.map((row, idx) => (
                    <tr key={idx}><td>{row.title}</td><td>{row.requests_count}</td></tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Top szerzők</Card.Title>
              <Table striped bordered hover size="sm" className="mb-2">
                <thead>
                  <tr><th>Szerző</th><th>Keresések</th></tr>
                </thead>
                <tbody>
                  {topAG.authors.map((row, idx) => (
                    <tr key={idx}><td>{row.name}</td><td>{row.requests_count}</td></tr>
                  ))}
                </tbody>
              </Table>
              <Card.Title>Top műfajok</Card.Title>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr><th>Műfaj</th><th>Keresések</th></tr>
                </thead>
                <tbody>
                  {topAG.genres.map((row, idx) => (
                    <tr key={idx}><td>{row.name}</td><td>{row.requests_count}</td></tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Most Exchanged City */}

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Legtöbbet cserélt város</Card.Title>
              {mostCity
                ? <p>{mostCity.city}: {mostCity.exchange_number} csere</p>
                : <p>Nincs elérhető adat</p>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Closed Exchanges */}
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>Lezárt cserék részletei</Card.Title>
          <Table striped bordered hover size="sm">
            <thead>
              <tr><th>Időszak</th><th>Szám</th></tr>
            </thead>
            <tbody>
              {closedEx.map((row, idx) => (
                <tr key={idx}><td>{row.period}</td><td>{row.count}</td></tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Refresh Button */}
      <Button onClick={() => window.location.reload()} className="mt-3">Adatok frissítése</Button>
    </Container>
    </div>
  );
}
