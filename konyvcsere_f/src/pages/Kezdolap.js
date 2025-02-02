import useAuthContext from "../contexts/AuthContext";

export default function Kezdolap(){
    const {user} = useAuthContext();

    //ellenőrizzük van-e bejelentkezett felhasználó
    return(
        <main className="kezdo">
            <h1>Adok-Kapok</h1>
        <section class="container">
        <article>
        </article>
        <div>
        <aside>
        
        <h2>Üdvözöllek az Adok-Kapok Közösségben!</h2>
    <ul>
        <li>Képzeld el, hogy egy új könyv mindig csak egy csere távolságra van tőled!</li>
        <li>Az oldalon lehetőséged van arra, hogy megoszd könyveidet másokkal, és új kedvenceket találj a cserék révén.</li>
        <li>Csatlakozz hozzánk, és hozd létre saját könyvcsere-listádat!</li>
        <li>Cserélj, fedezz fel és ossz meg könyveket, hogy egy szorosabb, olvasásra épülő közösséget építhessünk együtt!</li>
    </ul>
        </aside>
        <p>Bejelentkezett felhasználó: {user==null?"Nincs bejelentkezett felhasználó":user.full_name}</p>
        </div>
        </section>
        </main>
    )
}