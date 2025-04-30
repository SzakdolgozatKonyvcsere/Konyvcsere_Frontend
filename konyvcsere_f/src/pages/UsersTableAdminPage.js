import useApiContext, { ApiContext } from "../contexts/ApiContext";
import UserTableAdmin from "../components/AdminTables/UserTableAdmin";
import { useEffect } from "react";

export default function UsersTableAdminPage() {
    const {getUsers, userLista} = useApiContext();
    useEffect (()=>{
      if(userLista.length === 0) getUsers("/api/users")
    }, []);

    return (
        <main>
            <h1>Táblázat Összes User - Admin</h1>
            <div>
                <UserTableAdmin users={userLista} /> {/*UserTablazatAdmin*/}
                {/*<p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>*/}
            </div>
        </main>
       
    );
}