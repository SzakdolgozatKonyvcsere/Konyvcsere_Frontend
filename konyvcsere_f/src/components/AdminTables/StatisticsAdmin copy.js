
export default function StatisticsAdmin(){


    return(
        <Container fluid>
    {/* 1. Felső KPI-sor 
    <Row className="mb-4">
      <Col><StatsCard title="Új regisztrációk (napi)" value={...} /></Col>
      <Col><StatsCard title="Bejelentkezések (heti)" value={...} /></Col>
      <Col><StatsCard title="Lezárt cserék (havi)" value={...} /></Col>
      <Col><StatsCard title="Átlagos csereidő" value={`${avgTime} óra`} /></Col>
    </Row>*/}

    {/* 2. Trend- és kategória-diagramok */}
    <Row className="mb-4">
      <Col md={6}>
        <LineChartCard
          title="Regisztrációk trendje"
          data={registrationTrend}
          intervalOptions={["napi","heti","havi","évi"]}
        />
      </Col>
      <Col md={6}>
        <BarChartCard
          title="Könyvfeltöltések kategóriánként"
          data={uploadsByCategory}
        />
      </Col>
    </Row>

    {/* 3. Arányok és toplisták */}
    <Row className="mb-4">
      <Col md={4}>
        <PieChartCard
          title="Sikeres vs. sikertelen cserék"
          data={exchangeSuccessRatio}
        />
      </Col>
      <Col md={8}>
        <TableCard
          title="Legnépszerűbb könyvek"
          columns={bookColumns}
          data={topBooks}
          pageSize={10}
        />
      </Col>
    </Row>

    {/* 4. Részletes csere-táblázat */}
    <Row>
      <Col>
        <DetailsTable
          title="Lezárt cserék részletei"
          columns={exchangeColumns}
          data={closedExchanges}
          pageSize={20}
        />
      </Col>
    </Row>

    {/* 5. Frissítés gomb */}
    <Button onClick={refreshAll} className="mt-3">Adatok frissítése</Button>
  </Container>
    )
}

