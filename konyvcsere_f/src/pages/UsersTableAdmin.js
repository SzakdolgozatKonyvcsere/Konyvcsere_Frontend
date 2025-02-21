import useApiContext from "../contexts/ApiContext";
import UserTableAdmin from "../components/AdminTables/UserTableAdmin";

export default function UsersTableAdmin() {
     const { user } = useApiContext(); 

    return (
        <main>
            <h1>Táblázat Összes User - Admin</h1>
            <div>
                <UserTableAdmin /> {/*UserTablazatAdmin*/}
                {/*<p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>*/}
            </div>
        </main>
       
    );
}