import { Link } from "react-router-dom";
import useAuthContext from "../../contexts/AuthContext";
import useApiContext from "../../contexts/ApiContext";
import { useEffect, useState } from "react";


export default function KonyvKeresModalProfile({ userId }) {

    const { getUserById } = useApiContext(); // Összes felhasználó listája
    const [feltoltoUser, setFeltoltoUser] = useState(null);

 
    //const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
        const [user, setUser] = useState("");
        
        //feltoltoUser=getUsers('/user/{id}')

        useEffect(() => {
            console.log("Kapott userId:", userId);
            if (!userId || typeof userId !== "number") {
                console.warn("Hibás userId:", userId);
                return;
            }
            if (userId) {
                getUserById(userId)
                .then(user => {
                    if (user) {
                        console.log("Lekért felhasználó:", user);
                        setFeltoltoUser(user);
                    } else {
                        console.warn("Felhasználó nem található!");
                    }
                })
                    
                .catch(error => console.error("Hiba a user lekérdezésnél:", error));
                    //setFeltoltoUser(user))
                //setFeltoltoUser(user || null);
            }
            

        }, [userId]);
    
        if (!feltoltoUser) return <p>Feltöltő: Ismeretlen</p>;
    

return (
    <>
    <div className="kisProfil">
    {/* Feltöltő felhasználó információi */}
        <Link to={`/profil/${feltoltoUser.id}`} className="feltoltoUser">
            <img src={feltoltoUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture" />
            <span className="userProfileName">{feltoltoUser.full_name}</span>
        </Link>
    </div>
    </>
);
}
