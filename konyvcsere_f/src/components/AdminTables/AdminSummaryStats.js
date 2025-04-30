
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import useApiContext from '../../contexts/ApiContext';
import useAuthContext from '../../contexts/AuthContext';

export default function AdminSummaryStats() {

  const intervals = [
    { key: 'daily',   label: 'Napi' },
    { key: 'weekly',  label: 'Heti' },
    { key: 'monthly', label: 'Havi' },
    { key: 'yearly',  label: 'Évi' }
  ];

  const { user } = useAuthContext();
  const { getRegistrationsStat, getLoginsStat, getClosedExchangesStat } = useApiContext();

  const [regData, setRegData] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [closedData, setClosedData] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function fetchAll() {
      const regs = await Promise.all(
        intervals.map(i => getRegistrationsStat(i.key).then(arr => arr.reduce((sum,r)=>sum+r.count,0)))
      );
      const logs = await Promise.all(
        intervals.map(i => getLoginsStat(i.key).then(arr => arr.reduce((sum,r)=>sum+r.count,0)))
      );
      const closed = await Promise.all(
        intervals.map(i => getClosedExchangesStat(i.key).then(arr => arr.reduce((sum,r)=>sum+r.count,0)))
      );
      setRegData(intervals.map((i, idx) => ({ interval: i.label, count: regs[idx] })));
      setLoginData(intervals.map((i, idx) => ({ interval: i.label, count: logs[idx] })));
      setClosedData(intervals.map((i, idx) => ({ interval: i.label, count: closed[idx] })));
    }
    fetchAll();
  }, [user]);

  const ChartCard = ({ title, data, color }) => (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="interval" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="stats-admin">
      
      <p className="intro">
        A regisztrációk, bejelentkezések és lezárt cserék számai napi, heti, havi és évi bontásban.
      </p>
      <Row>
        <Col md={4}>
          <ChartCard title="Regisztrációk" data={regData} color="#8884d8" />
        </Col>
        <Col md={4}>
          <ChartCard title="Bejelentkezések" data={loginData} color="#82ca9d" />
        </Col>
        <Col md={4}>
          <ChartCard title="Lezárt Cserék" data={closedData} color="#ffc658" />
        </Col>
      </Row>
      <Button onClick={() => window.location.reload()} className="mt-3">Frissítés</Button>
    </Container>
  );
}
