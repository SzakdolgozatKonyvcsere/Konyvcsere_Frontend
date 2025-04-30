import useApiContext from "../contexts/ApiContext";
import ExchangeTableAdmin from "../components/AdminTables/ExchangeTableAdmin";import { useEffect } from "react";
;

export default function ExchangesTableAdminPage() {
    const { exchangeLista, getExchange } = useApiContext();
    useEffect(() => {
      if(exchangeLista.length === 0) getExchange("/api/exchanged-books");
    }, [exchangeLista]);
  
  return (
    <main>
      <h1>Táblázat Összes Cserefolyamat - Admin</h1>
        <ExchangeTableAdmin exchanges={exchangeLista} />
    </main>
  );
}
