import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Ez szükséges az URL paraméterekhez
import useApiContext from '../../contexts/ApiContext';

export default function ProfilPage() {
    const { id } = useParams();  // Lekérjük az URL-ből az id paramétert
    const { getUserById } = useApiContext(); // Felhasználó lekérése
    const [user, setUser] = useState(null);  // Tárolja a felhasználó adatait

    useEffect(() => {
        if (id) {
            getUserById(id) // Az id alapján lekérjük a felhasználót
                .then(fetchedUser => {
                    if (fetchedUser) {
                        setUser(fetchedUser);  // Ha sikerült lekérni, elmentjük
                    } else {
                        console.warn("Felhasználó nem található!");
                    }
                })
                .catch(error => console.error("Hiba a user lekérdezésnél:", error));
        }
    }, [id]); // Csak akkor fut le, ha az id változik

    if (!user) {
        return <p>Felhasználó adatainak betöltése...</p>; // Ha a felhasználó adatainak betöltése még nem történt meg
    }

    return (
        <div className="profil-page">
            <h1>{user.full_name}</h1>
            <img src={user.img_url || 'user_basic_pfp.jpg'} alt="Profilkép" />
            <p>Email: {user.email}</p>
            <p>Regisztráció dátuma: {user.created_at}</p>
            {/* További felhasználói adatok */}
        </div>
    );
}