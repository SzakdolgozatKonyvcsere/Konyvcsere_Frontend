
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';

import useAuthContext from '../../contexts/AuthContext';
import useApiContext from '../../contexts/ApiContext';
import { useNavigate } from 'react-router-dom';

//a keresés funkcióhoz az összes elérhető könyv megmutatása
//modal, tehát a felugró ablak gomb általi mutatása, könvek részleteinek kiirása
export default function OtherUserChooseBookCard(props) {


  
        const [modalShow, setModalShow] = useState(false);
        const [selectedBook, setSelectedBook] = useState(null);

        const navigate = useNavigate(); // A useNavigate hookot a komponens elején hívjuk meg


        const handleShowModal = (book) => {
          if (book){
            setSelectedBook(book);
            setModalShow(true);
            
          }
          
      };

      // kerelem kuldes:
      const { postExchangeRequest } = useApiContext();
      const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
          
          const [user, setUser] = useState("");
          useEffect(() => {
              if (authUser) {
                setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
              }
            }, [authUser]);
          
        
          /* const handleExchangeRequest = async () => {
              setSelectedBook(props.book.offer_id)

              const exchangeReqest = {
                // !!!!!!!!!!!!!! ez itt nem felesleges, a user meg setuser, ha ugyis authusert hasznalok itt..
                  interested_user: authUser?.id, // Logged-in user ID
                  desired_item: props.book?.offer_id, // The book that the user is interested in
                  exchange_status: 'k' // Example status ('P' = Pending)
                  
                };
                console.log("Kérelem kezdeményezés adatok: ", exchangeReqest);
                postExchangeRequest(exchangeReqest)
                //postBooks('/api/exchange-request', exchangeReqest)
      
          } */

                

          
      
          useEffect(() => {
            console.log("Kapott könyv adat:", props.book);
        }, [props.book]);


          
        const handleSelectBook = (book) => {
          localStorage.setItem("selectedBook", JSON.stringify(book)); // Elmentjük a könyvet
          console.log(book.offer_id)
              navigate(-1); // Visszavisz az előző oldalra
      };


    return( 
        <>
        <div className="card all-available-books-other">
        <div className="allofit all-available-books-other">
          <div className='all-available-books-other imagecontainer'>
          <img className='all-available-books-other__image' src={props.book.img_url ? `http://localhost:8000/${props.book.img_url}` : '/basic_book.png'}></img>
          </div>
          <div className="card-body all-available-books-other">
            <div className="text-section all-available-books-other">
              <h5 className="card-title all-available-books-other__title" >{props.book.title || "Nincs cím"}</h5>
                <ul className="list-group list-group-flush all-available-books-other-right">
                  <li className="list-group-item all-available-books-other-right__text" ><small className="text-muted -adat" >{props.book.authors ? `${props.book.authors}` : "ismeretlen szerző"}</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" >
                  <small className="text-muted -adat" >
                  {props.book.publisher_name ?  `${props.book.publisher_name}` : "ismeretlen kiadó"} Kiadó</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" >
                  <small className="text-muted -adat" >
                  <span>Kiadás éve: </span>
                  {props.book.publication_year ? props.book.publication_year : "nincs dátum"}</small></li>
                          {/*<li className="list-group-item all-available-books-other" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{props.book.language ? `${props.book.language}` : "nincs nyelv"}</small></li>*/}
                  <li className="list-group-item no-b all-available-books-other-right__text" >
                  <small className="text-muted -adat" >
                  <span>Műfaj: </span>
                  {props.book.genre_name ? `${props.book.genre_name}` : "nincs műfaj"}</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" >
                  <small className="text-muted -adat" >
                  <span>Nyelv: </span>
                  {props.book.language ? `${props.book.language}` : "nincs nyelv"}</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" >
                  <small className="text-muted -adat" >
                  <span>Minőség: </span> {props.book.quality ? `${props.book.quality}` : "nincs minőség"}/5</small></li>




                </ul>
              </div>
            </div>
            <div className='button_section all-available-books-other'>
                            <div></div>
                            {/*{userBookOffersInfo2.map((book) => (
                                <button 
                                    key={book.offer_id} 
                                    className="btn btn-primary all-available-books-other__btn" 
                                    variant="primary"  
                                    onClick={() => handleSelectBook(book)}>Elcserélem</button>
                            ))} */}
                            <button className="btn btn-primary all-available-books-other__btn" variant="primary"  onClick={() => handleSelectBook(props.book)}>Elcserélem</button>

                            
                            </div>
            
            

                        {/*Pass the selected book title to the modal 
                  <KonyvKeresModalOtherUser
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      book={selectedBook} 
                  />*/}
             </div>
             </div>
          </>     
    )

}

