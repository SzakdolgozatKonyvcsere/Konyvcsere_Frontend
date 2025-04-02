// other useresbol copy, CSAK infokat listaz

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useApiContext, { ApiContext } from '../../contexts/ApiContext';
import { useContext, useEffect, useState } from 'react';
import useAuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';



//modal, tehát felugró ablak kinézete, összeállítása, könyv részletei
//cserélés elindítása gomb
export default function UserOwnExchangesModalOtherProfile({userO, ...props}) {

    const { postExchangeRequest } = useContext(ApiContext);
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
    
    const [user, setUser] = useState("");
    useEffect(() => {
        if (authUser) {
          setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
        }
      }, [authUser]);
    
  
    /* const handleExchangeRequest = async () => {
        const exchangeReqest = {
          // !!!!!!!!!!!!!! ez itt nem felesleges, a user meg setuser, ha ugyis authusert hasznalok itt..
            interested_user: authUser?.id, // Logged-in user ID
            desired_item: book?.offer_id, // The book that the user is interested in
            exchange_status: 'k' // Example status ('P' = Pending)
            
          };
          console.log("Kérelem kezdeményezés adatok: ", exchangeReqest);
          postExchangeRequest(exchangeReqest)
          //postBooks('/api/exchange-request', exchangeReqest)

    } */
    

    useEffect(() => {
      console.log("Kapott user adat:", userO);
      
  }, [userO]);


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton data-bs-theme="dark" className='modalHeader' >
          <Modal.Title id="contained-modal-title-vcenter">
            Érdeklődő felhasználó
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <div className='modalBodyFenn'>
          <h4 style={{ textAlign: "center" }}>{userO?.full_name}</h4>
          <p style={{ textAlign: "center" }} className='modalAlahuzas'>
            <small className="text-muted -adat">
              {userO?.name ? userO.name : "Ismeretlen username"}
            </small>
          </p>
          </div>
          <div className='modalBodyRendezes'>
          <div className='modalImage' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
          className='modalimg'
          src={
            userO?.img_url
              ? userO.img_url.startsWith("http")
                ? userO.img_url
                : `http://localhost:8000/${userO.img_url}`
              : "/user_basic_pfp.jpg"
          }
          alt="Profilkép"
        />
          </div>
          
  
          {/* User details with proper tags */}
          <div className="modalDetails">
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
            <span className='spanModalOtherUser'>Megadott város: </span> {userO?.city ? userO.city : "Ismeretlen város"} 
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
            <span className='spanModalOtherUser'>Cserélem könyveimet: </span>{userO?.registered_since ? userO.registered_since : "Nincs dátum"}
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
            <span className='spanModalOtherUser'>Befejezett cseréim száma: </span>{userO?.exchange_count ? userO.exchange_count : "Nincs szám"}</small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat"> {/* !!!!!!! műfajt oldd meg !!!!! */}
            <span className='spanModalOtherUser'>Legtöbbet cserélt műfaj:</span>{userO?.mostExchangedGenre ? userO.mostExchangedGenre : "Nincs műfaj"}</small>
          </p>
         
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='modalFooterEmpty'>
        </Modal.Footer>
      </Modal>
    );
  }