

import useApiContext from "../contexts/ApiContext";

export default function UsersTablazatAdmin() {
     const { user } = useApiContext(); 

    return (
        <div>
            <h1>Táblátat Összes User - Admin</h1>
            <p>Bejelentkezett felhasználó: { user==null?"Nincs bejelentkezett felhasználó!":user.name }</p>
        </div>
    );
}