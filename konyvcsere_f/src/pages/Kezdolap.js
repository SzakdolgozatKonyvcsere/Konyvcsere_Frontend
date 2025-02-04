import useAuthContext from "../contexts/AuthContext";

export default function Kezdolap(){
    const {user} = useAuthContext();

    //ellenőrizzük van-e bejelentkezett felhasználó
    return(
        <main className="main-container">
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
        
            {/*<h1>Kezdőlap</h1>*/}
            <section class="container">
                <article>
                
                </article>
                <aside>
                    <h2>Üdvözöllek a Könyvcserélő Közösségben!</h2>
                    <p>Képzeld el, hogy egy új könyv mindig csak egy csere távolságra van tőled! Itt az oldalon lehetőséged van arra, hogy a könyveidet másokkal megoszd, és új kedvenceket találj a cserék révén. Legyen szó klasszikus irodalomról, izgalmas krimikről vagy épp inspiráló önfejlesztő olvasmányokról – nálunk minden könyv új kalandot hoz! Csatlakozz hozzánk, és hozd létre saját könyvcsere-listádat! Cserélj, fedezz fel és ossz meg könyveket, hogy egy szorosabb, olvasásra épülő közösséget építhessünk együtt!</p>
                </aside>
                {/*<p id="authorized-username">{user!==null?user.full_name:"Vendég"}</p>*/}

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
