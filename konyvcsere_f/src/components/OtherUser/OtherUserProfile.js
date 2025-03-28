import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Ez szükséges az URL paraméterekhez
import useApiContext from '../../contexts/ApiContext';
import KonyvKeresKartyakOtherUser from './KonyvKeresKartyakOtherUser';

export default function ProfilPage() {
    const { id } = useParams();  // Lekérjük az URL-ből az id paramétert
    const { getUserById, getUserBookOffersInfo2, userBookOffersInfo2, getUserByIdGenre } = useApiContext(); // Felhasználó lekérése
    const [user, setUser] = useState(null);  // Tárolja a felhasználó adatait
    const [mostExchangedGenre, setMostExchangedGenre] = useState(null); // Tárolja a legcseréltebb műfajt
    

    useEffect(() => {
        if (id) {
            // id alapján lekérjük a felhasználót
            getUserById(id) 
                .then(user => {
                    if (user) {
                        setUser(user);  // Ha sikerült lekérni, elmentjük
                    } else {
                        console.warn("Felhasználó nem található!");
                        setUser("Felhasználó nem található!");
                    }
                })
                .catch(error => console.error("Hiba a user lekérdezésnél:", error));
            // Lekérjük a felhasználó legcseréltebb műfaját
            getUserByIdGenre(id)
                .then(genre => {
                    if (genre) {
                        setMostExchangedGenre(genre[0].genre_name);  // Ha van adat, beállítjuk a műfajt
                    } else {
                        setMostExchangedGenre("Nincs adat!"); 
                    }
                })
                .catch(error => console.error("Hiba a műfaj lekérdezésnél:", error));
            // usernek a könyvei
            getUserBookOffersInfo2(id) 
                
        }
    }, [id]); // ccsak akkor fut le ha az id változik

    if (!user) {
        return <p>Felhasználó adatainak betöltése...</p>; 
    }

    return (
        <div className='other-profile-page'>
        <div className='otherUserProfileInfo'>
            <h1>{user.full_name}</h1>
            <small className='felhNev'>{user.name}</small>
            <img className='user-own-profile__details-top__image' src={user.img_url ? (user.img_url.startsWith("http") ? user.img_url : `http://localhost:8000/${user.img_url}` ) : "/default-profile.jpg"} alt="Profilkép" />
            {/* További felhasználói adatok */}
            <p><span>Jelneleg</span> {/* online status + zld piros szinu jel? */} online/offline <span>vagyok</span></p>
            <p><span>Megadott város:</span> {user.city}</p>
            {/*<p><span>Regisztráció dátuma:</span> {user.created_at}</p>*/} 
            <p><span>Cserélem könyveimet:</span> {user.registered_since}</p>
            <p><span>Befejezett cseréim száma:</span> {user.exchange_count}</p>
            <p><span>Legtöbbet cserélt műfaj:</span> {mostExchangedGenre}</p>
        </div>
        <div className='otherUserBooksInfo'>
        <h3>Kínált könyveim: </h3><br />
                <div className="konyv">
                        {
                            userBookOffersInfo2.map((book) => {
                            return <KonyvKeresKartyakOtherUser book={book} key={book.offer_id} />;
                          })
                        }
                      </div>
        </div>
        </div>
    );
}