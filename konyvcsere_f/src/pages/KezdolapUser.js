import LegujabbKonyvAjanlat from "../components/LegujabbKonyvAjanlat";
import useAuthContext from "../contexts/AuthContext";
import kep2 from '../assets/kepek/kep2.jpg';

export default function KezdolapUser() {
     const { user } = useAuthContext(); 

    return (
        <main className="main-container">
        <h1>Adok-Kapok</h1>
        
        
            {/*<h1>Kezdőlap</h1>*/}
            <section className="container">
                <aside className="welcome-box">
                    <h2>Üdvözöllek{user?.full_name ? `, ${user.full_name}` : ""} az Adok-Kapok Közösségben!</h2>
                    <ul>
                        <li>Képzeld el, hogy egy új könyv mindig csak egy csere távolságra van tőled!</li>
                        <li>Az oldalon lehetőséged van arra, hogy megoszd könyveidet másokkal, és új kedvenceket találj a cserék révén.</li>
                        <li>Csatlakozz hozzánk, és hozd létre saját könyvcsere-listádat!</li>
                        <li>Cserélj, fedezz fel és ossz meg könyveket, hogy egy szorosabb, olvasásra épülő közösséget építhessünk együtt!</li>
                    </ul>
                </aside>
                <div
                    className="image"
                    style={{ backgroundImage: `url(${kep2})` }}
                    role="img"
                    aria-label=""
                />
            </section>
            <section className="books-section">
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