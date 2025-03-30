import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import UserOwnExchangesCard1 from "./UserOwnExchangesCard1";
import useAuthContext from "../../contexts/AuthContext";


export default function UserOwnExchanges() {

    const { getExchangeByUser } = useApiContext();
 
    const [exchanges, setExchanges] = useState([]);
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [user, setUser] = useState("");

        useEffect(() => {
            if (authUser) {
              setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
              console.log("csere, bejelenkezett fh: ", user) //ok
            }
          }, [authUser]);
   

    useEffect(() => {
        async function fetchData() {
            try {
                const exchangeData = await getExchangeByUser(authUser.id);
                setExchanges(exchangeData || []);
                console.log("cserek: ", exchangeData) // ok
                console.log("cserek2: ", exchanges)
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
        }
        fetchData();
    }, []);


    return(
        <div className="exchangesBig">
            <h1>Csere történeteim: </h1>
            <div className="exchangeCards">
            {exchanges.length > 0 ? (
                exchanges.map((exchange) => (
                    <UserOwnExchangesCard1 key={exchange.exchange_id} exchange={exchange} />
                ))
            ) : (
                <p>Nincsenek csere tranzakciók.</p>
            )}
            </div>
            
        </div>
    );
}