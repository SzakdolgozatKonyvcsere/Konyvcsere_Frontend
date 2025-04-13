import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import UserOwnExchangesCard1 from "./UserOwnExchangesCard1";
import useAuthContext from "../../contexts/AuthContext";
import { Tab, Tabs } from "react-bootstrap";
import UserOwnExchangesCard2 from "./UserOwnExchangesCard2";
import UserOwnExchangesCard3 from "./UserOwnExchangesCard3";


export default function UserOwnExchanges() {

    const { getExchangeByUser } = useApiContext();
 
    const [exchanges, setExchanges] = useState([]);
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    //const [user, setUser] = useState("");

    const [key, setKey] = useState('beerkezo');

        useEffect(() => {
            if (authUser) {
              //setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
              console.log("csere, bejelenkezett fh: ", authUser.id) //ok
            }
          }, [authUser]);
   

    useEffect(() => {
        if (!authUser || !authUser.id) return;
        async function fetchData() {
            try {
                const exchangeData = await getExchangeByUser(authUser.id);
                setExchanges(exchangeData || []);
                //console.log("lekert cserek: ", exchangeData, authUser) // ok
                //console.log("cserek2: ", exchanges) regi allapoto mutatja
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
            //console.log("cserek2 (regi allapot?): ", exchanges)
        }
        fetchData();
    }, [authUser]);

    useEffect(() => {
        console.log("Frissült az exchanges állapot:", exchanges);
    }, [exchanges]);

    const refreshExchanges = async () => {
        try {
          const exchangeData = await getExchangeByUser(authUser.id);
          setExchanges(exchangeData || []);
        } catch (error) {
          console.error("Hiba a frissítésnél:", error);
        }
      };


    // !!!!
    // 2 oszlop/ 2 FÜL!! - bejovo, valaszra var..

    return(
        <div className="exchangesBig">
            <h1>Csere történeteim: </h1>
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            >
            <Tab eventKey="beerkezo" title="Beérkező">

                <div className="exchangeCards">
                {exchanges.filter(e => 
                    (e.exchange_status === 'k' && e.interested_user_id !== authUser.id) || 
                    (e.exchange_status === 'f' && e.offered_book_id === null)
                ).length > 0 ? (
                    exchanges
                        .filter(e => 
                            (e.exchange_status === 'k' && e.interested_user_id !== authUser.id) || 
                            (e.exchange_status === 'f' && e.offered_book_id === null)
                        )
                        .map(exchange => (<UserOwnExchangesCard1 key={exchange.exchange_id} exchange={exchange} refreshExchanges={refreshExchanges} />))
                ) : (
                    <p>Nincsenek beérkező cserék.</p>
                )}
                </div>

            </Tab>
            <Tab eventKey="folyamatban" title="Folyamatban">
                <div className="exchangeCards">
                {exchanges.filter(e => e.exchange_status === 'f' || (e.exchange_status === 'k' && e.interested_user_id === authUser.id)).length > 0 ? (
                    exchanges
                        .filter(e => e.exchange_status === 'f' || (e.exchange_status === 'k' && e.interested_user_id === authUser.id))
                        .map(exchange => <UserOwnExchangesCard2 key={exchange.exchange_id} exchange={exchange} />)
                ) : (
                    <p>Nincsenek folyamatban lévő cserék.</p>
                )}
                </div>
            </Tab>
            <Tab eventKey="befejezett" title="Befejezett">
                <div className="exchangeCards">
                {exchanges.filter(e => e.exchange_status === 'a' || (e.exchange_status === 'v')).length > 0 ? (
                    exchanges
                        .filter(e => e.exchange_status === 'a' || (e.exchange_status === 'v'))
                        .map(exchange => <UserOwnExchangesCard3 key={exchange.exchange_id} exchange={exchange} />)
                ) : (
                    <p>Nincsenek befejezett cserék.</p>
                )}
                </div>
            </Tab>
            <Tab eventKey="talalatok" title="Találatok">
                <div className="exchangeCards">

                </div>
            </Tab>
        </Tabs>
            
            
        </div>
    );
}