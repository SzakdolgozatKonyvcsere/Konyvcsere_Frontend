import useAuthContext from "../contexts/AuthContext";
import { useState, useEffect } from "react";
//import konyvVideo from "../assets/video/konyv.mp4";
import { myAxios } from "../api/axios";
import LegujabbKonyvAjanlat from "../components/LegujabbKonyvAjanlat";


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
                
                <aside>
                    <h2>Üdvözöllek az Adok-Kapok Közösségben!</h2>
                    <ul>
                        <li>Képzeld el, hogy egy új könyv mindig csak egy csere távolságra van tőled!</li>
                        <li>Az oldalon lehetőséged van arra, hogy megoszd könyveidet másokkal, és új kedvenceket találj a cserék révén.</li>
                        <li>Csatlakozz hozzánk, és hozd létre saját könyvcsere-listádat!</li>
                        <li>Cserélj, fedezz fel és ossz meg könyveket, hogy egy szorosabb, olvasásra épülő közösséget építhessünk együtt!</li>
                    </ul>
                </aside>
                <LegujabbKonyvAjanlat />
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
