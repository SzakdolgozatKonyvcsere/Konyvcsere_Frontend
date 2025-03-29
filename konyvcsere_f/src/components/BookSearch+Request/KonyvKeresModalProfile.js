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
            if (!userId) {
                console.warn("Hibás userId:", userId);
                return;
            }
            
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
                console.log("Feltöltő felhasználó állapota frissült:", feltoltoUser);
            

        }, [userId], [feltoltoUser]);
    
        if (!feltoltoUser) return <p>Feltöltő: Ismeretlen</p>;

        
    

return (
    <>
    <div className="kisProfil">
    {/* Feltöltő felhasználó információi */}
    {feltoltoUser ? (
        <Link to={`/profil/${feltoltoUser.id}`} className="feltoltoUser">
            <img src={feltoltoUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture" />
            <span className="userProfileName">{feltoltoUser.full_name}</span>
        </Link>
    ) : (
        <p>Feltöltő: Ismeretlen</p>
    )}
        
    </div>
    </>
);
}
