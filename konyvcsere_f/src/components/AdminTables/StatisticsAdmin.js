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
  Legend
} from 'recharts';
import useApiContext from '../../contexts/ApiContext';
import useAuthContext from '../../contexts/AuthContext';

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
    getTopAuthorsGenresStat
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
    }
    fetchStats();
  }, [user, intervalReg, intervalLogin, intervalUploadTrend, intervalClosedEx]);

  // KPI Card Component
  const StatsCard = ({ title, value }) => (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text as="h2">{value}</Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <div className="stats-container">
      <h1 className="page-title">Admin Statisztikák</h1>
      <p className="intro">
      Üdvözöllek {user?.full_name ? `, ${user.full_name}` : ""}!
        Itt áttekintheted a felhasználói aktivitást, a könyvfeltöltéseket és a cserefolyamatokat különböző bontásokban.
      </p>
    <Container fluid>
      {/* KPI Row */}
      <Row className="mb-4">
        <Col><StatsCard title="Új regisztrációk (napi)" value={regStats.reduce((sum, r) => sum + r.count, 0)} /></Col>
        <Col><StatsCard title="Bejelentkezések (heti)" value={loginStats.reduce((sum, l) => sum + l.count, 0)} /></Col>
        <Col><StatsCard title="Lezárt cserék (havi)" value={closedEx.reduce((sum, e) => sum + e.count, 0)} /></Col>
        <Col><StatsCard title="Átlagos csereidő" value={`${avgTime} óra`} /></Col>
      </Row>

      {/* Trend and Category Charts */}
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

      {/* Success Ratio and Top Lists */}
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
                  <tr><th>Könyv</th><th>Kérések</th></tr>
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
                  <tr><th>Szerző</th><th>Kérések</th></tr>
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
                  <tr><th>Műfaj</th><th>Kérések</th></tr>
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

      {/* Manual Refresh Button */}
      <Button onClick={() => window.location.reload()} className="mt-3">Adatok frissítése</Button>
    </Container>
    </div>
  );
}
