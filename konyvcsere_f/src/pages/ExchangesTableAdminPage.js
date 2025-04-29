import useApiContext from "../contexts/ApiContext";
import ExchangeTableAdmin from "../components/AdminTables/ExchangeTableAdmin";;

export default function ExchangesTableAdminPage() {
    const { exchangeLista, loading } = useApiContext();

  return (
    <main>
      <h1>Táblázat Összes Cserefolyamat - Admin</h1>
        <ExchangeTableAdmin exchanges={exchangeLista} />
    </main>
  );
}
