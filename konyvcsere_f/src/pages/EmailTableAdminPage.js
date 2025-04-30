import useApiContext from "../contexts/ApiContext";
import EmailTableAdmin from "../components/AdminTables/EmailTableAdmin";
import { useEffect } from "react";

export default function EmailTableAdminPage(){
    const {emailLista, getEmail} = useApiContext();

    useEffect(() => {
          if(emailLista.length === 0) getEmail("/api/email-report");
        }, [emailLista]);
      
      return (
        <main>
          <h1>Táblázat Összes Csere Email - Admin</h1>
            <EmailTableAdmin emails={emailLista} />
        </main>
      );
    }
