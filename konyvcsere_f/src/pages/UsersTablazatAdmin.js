

import useApiContext from "../contexts/ApiContext";
import UserTablazatAdmin from "../components/AdminTables/UserTablazatAdmin";

export default function UsersTablazatAdmin() {
     const { user } = useApiContext(); 

    return (
        <main>
            <h1>Táblázat Összes User - Admin</h1>
            <div>
                <UserTablazatAdmin />
                {/*<p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>*/}
            </div>
        </main>
       
    );
}