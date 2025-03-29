import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import UserOwnExchangesCard1 from "./UserOwnExchangesCard1";


export default function UserOwnExchanges() {

    const { getExchangeByUser } = useApiContext();
 
    const [exchanges, setExchanges] = useState([]);
   

    useEffect(() => {
        async function fetchData() {
            try {
                const exchangeData = await getExchangeByUser();
                setExchanges(exchangeData || []);
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