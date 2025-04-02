import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Modal } from "react-bootstrap";


export default function UserOwnExchangesModalCooseBook({user, ...props}) {

    const { getUserById, getUserBookOffersInfo2, userBookOffersInfo2, getUserByIdGenre } = useApiContext(); // Felhasználó lekérése
    //const [user, setUser] = useState(null);  // Tárolja a felhasználó adatait

     useEffect(() => {
            if (user) {
              
                // usernek a könyvei
                getUserBookOffersInfo2(user) 
                    
            }
        }, [user]); // ccsak akkor fut le ha az id változik
    
        if (!user) {
            return <p>Felhasználó adatainak betöltése...</p>; 
        }




    return(
        
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton data-bs-theme="dark" className='modalHeader' >
          <Modal.Title id="contained-modal-title-vcenter">
            Válassz a könyveim közül! 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
        <card>
        <p> könyveim: </p><br />


        </card>
        
        </Modal.Body>
        
        
        
        </Modal>




        
    );
}