import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ApiContext } from '../../contexts/ApiContext';
import { useContext } from 'react';


//modal, tehát felugró ablak kinézete, összeállítása, könyv részletei
//cserélés elindítása gomb
export default function KonyvKeresModal(props) {

    const { postExchangeRequest } = useContext(ApiContext);
  
    const handleExchangeRequest = async () => {
        const exchangeReqest = {
            interested_user: props.user, // Logged-in user ID
            desired_item: props.offer_id, // The book that the user is interested in
            exchange_status: 'k' // Example status ('P' = Pending)
            
          };
          console.log("Kérelem kezdeményezés adatok: ", exchangeReqest);
          postExchangeRequest(exchangeReqest)
          //postBooks('/api/exchange-request', exchangeReqest)

    }

    

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Könyv részletei
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4 style={{ textAlign: "center" }}>{props.title}</h4>
  
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              className='modalimg'
              src={'/basic_book.png'}
              alt="Book Cover"
              style={{ width: "40vh", display: "block", margin: "auto", alignContent: "left" }} 
            />
          </div>
  
          {/* Book details with proper tags */}
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
              {props.author_name ? props.author_name : "Ismeretlen szerző"}
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
              {props.publication_year ? props.publication_year : "Nincs dátum"}
            </small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">{props.language}</small>
          </p>
          <p style={{ textAlign: "center" }}>
            <small className="text-muted -adat">
              {props.publisher_name ? props.publisher_name : "Ismeretlen kiadó"}
            </small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleExchangeRequest} variant="success">Könyv kérése</Button>
        </Modal.Footer>
      </Modal>
    );
  }