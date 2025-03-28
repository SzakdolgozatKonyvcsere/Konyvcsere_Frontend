import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useApiContext, { ApiContext } from '../../contexts/ApiContext';
import { useContext, useEffect, useState } from 'react';
import useAuthContext from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';



//modal, tehát felugró ablak kinézete, összeállítása, könyv részletei
//cserélés elindítása gomb
export default function KonyvKeresModalOtherUser({book, ...props}) {

    const { postExchangeRequest } = useContext(ApiContext);
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
    
    const [user, setUser] = useState("");
    useEffect(() => {
        if (authUser) {
          setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
        }
      }, [authUser]);
    
  
    const handleExchangeRequest = async () => {
        const exchangeReqest = {
            interested_user: authUser?.id, // Logged-in user ID
            desired_item: book?.offer_id, // The book that the user is interested in
            exchange_status: 'k' // Example status ('P' = Pending)
            
          };
          console.log("Kérelem kezdeményezés adatok: ", exchangeReqest);
          postExchangeRequest(exchangeReqest)
          //postBooks('/api/exchange-request', exchangeReqest)

    }
    

    useEffect(() => {
      console.log("Kapott könyv adat:", book);
  }, [book]);


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton data-bs-theme="dark" className='modalHeader' >
          <Modal.Title id="contained-modal-title-vcenter">
            Könyv részletei
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <div className='modalBodyFenn'>
          <h4 style={{ textAlign: "center" }}>{book?.title}</h4>
          <p style={{ textAlign: "center" }} className='modalAlahuzas'>
            <small className="text-muted -adat">
              {book?.authors ? book.authors : "Ismeretlen szerző"}
            </small>
          </p>
          </div>
          <div className='modalBodyRendezes'>
          <div className='modalImage' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              className='modalimg'
              src={'/basic_book.png'}
              alt="Book Cover"
              style={{ width: "40vh", display: "block", margin: "auto", alignContent: "left" }} 
            />
          </div>
          
  
          {/* Book details with proper tags */}
          <div className="modalDetails">
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
              {book?.publisher_name ? book.publisher_name : "Ismeretlen kiadó"} Kiadó
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
              {book?.publication_year ? book.publication_year : "Nincs dátum"}
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">{book?.language ? book.language : "Nincs nyelv"}</small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">{book?.genre_name ? book.genre_name : "Nincs műfaj"}</small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">minőség: {book?.quality ? book.quality : "Nincs minőség"}/5</small>
          </p>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='modalFooter'>
          
          <Button className="btn btn-primary all-available-books" onClick={handleExchangeRequest} variant="primary">Elcserélem!</Button>
        </Modal.Footer>
      </Modal>
    );
  }