import useAuthContext from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import konyvVideo from "../assets/video/konyv.mp4";
import { myAxios } from "../api/axios";

export default function Kezdolap() {
    const { user } = useAuthContext();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        if (user !== null) {
            setLoading(false);
        }
    }, [user]);

    const [latestBooks, setLatestBooks] = useState([]); // Legújabb könyvek tárolása

    useEffect(() => {
        // API hívás a legújabb könyvek lekérdezéséhez
        myAxios.get("/api/konyvek/latest")  // A backend endpoint lehet pl.: `/api/konyvek/latest`
            .then(response => {
                setLatestBooks(response.data); // Állapot beállítása
            })
            .catch(error => {
                console.error("Hiba a legújabb könyvek lekérésekor:", error);
            });
    }, []); 

    //ellenőrizzük van-e bejelentkezett felhasználó
    return (
        <main className="main-container">
            <h1>Adok-Kapok</h1>

            {/* Videó szekció 
            <section className="video-section">
                <video
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={konyvVideo}
                    type="video/mp4"
                    onLoadedData={() => console.log('Videó betöltve!')}
                    onError={(e) => console.error('Hiba történt a videó betöltésekor: ', e)}
                >
                    Your browser does not support the video tag.
                </video>
            </section>*/}



            {/*<h1>Kezdőlap</h1>*/}
            <section className="container">
                <article>

                </article>
                <aside>
                    <h2>Üdvözöllek az Adok-Kapok Közösségben!</h2>
                    <ul>
                        <li>Képzeld el, hogy egy új könyv mindig csak egy csere távolságra van tőled!</li>
                        <li>Az oldalon lehetőséged van arra, hogy megoszd könyveidet másokkal, és új kedvenceket találj a cserék révén.</li>
                        <li>Csatlakozz hozzánk, és hozd létre saját könyvcsere-listádat!</li>
                        <li>Cserélj, fedezz fel és ossz meg könyveket, hogy egy szorosabb, olvasásra épülő közösséget építhessünk együtt!</li>
                    </ul>
                </aside>

                {/* 🔹 Legújabb ajánlatok szekció */}
                <div className="ajanlas">
                    <h5>Legújabb ajánlatok:</h5>
                    <ul>
                        {latestBooks.length > 0 ? (
                            latestBooks.map((book) => (
                                <li key={book.id} className="book-item">
                                    <img src={book.img_url} alt={book.title} className="book-cover" />
                                    <div>
                                        <h6>{book.title}</h6>
                                        <p>{book.author}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Még nincsenek elérhető könyvek.</p>
                        )}
                    </ul>
                </div>
            </section>
            {/*
            <div className="body__main">
                <div>
                    <h1>Kezdőlap</h1>
                    <p>Bejelentkezett felhasználó: {user==null?"Nincs bejelentkezett felhasználó":user.full_name}</p>
                </div>
            </div>*/}
        </main>
    );
}
