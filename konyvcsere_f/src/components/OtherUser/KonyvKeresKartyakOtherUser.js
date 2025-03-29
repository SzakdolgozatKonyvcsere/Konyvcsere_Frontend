import React from 'react'
import { useState } from 'react';

import KonyvKeresModalOtherUser from './KonyvKeresModalOtherUser';

//a keresés funkcióhoz az összes elérhető könyv megmutatása
//modal, tehát a felugró ablak gomb általi mutatása, könvek részleteinek kiirása
export default function KonyvKeresKartyakOtherUser(props) {


  
        const [modalShow, setModalShow] = useState(false);
        const [selectedBook, setSelectedBook] = useState(null);

        const handleShowModal = (book) => {
          if (book){
            setSelectedBook(book);
            setModalShow(true);
            
          }
          
      };

    return( 
        <div className="card all-available-books-other">
          <div className="allofit all-available-books-other">
          <img className='all-available-books-other__image' src={props.book.img_url ? `http://localhost:8000/${props.book.img_url}` : '/basic_book.png'}></img>
          <div className="card-body all-available-books-other">
            <div className="text-section all-available-books-other">
              <h5 className="card-title all-available-books-other__title" >{props.book.title || "Nincs cím"}</h5>
                <ul className="list-group list-group-flush all-available-books-other-right">
                  <li className="list-group-item all-available-books-other-right__text" ><small className="text-muted -adat" >{props.book.authors ? `${props.book.authors}` : "ismeretlen szerző"}</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" ><small className="text-muted -adat" >{props.book.publisher_name ?  `${props.book.publisher_name}` : "ismeretlen kiadó"} Kiadó</small></li>
                  <li className="list-group-item no-b all-available-books-other-right__text" ><small className="text-muted -adat" >{props.book.publication_year ? props.book.publication_year : "nincs dátum"}</small></li>
                          {/*<li className="list-group-item all-available-books-other" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{props.book.language ? `${props.book.language}` : "nincs nyelv"}</small></li>*/}
                  <li className="list-group-item no-b all-available-books-other-right__text" ><small className="text-muted -adat" >{props.book.genre_name ? `${props.book.genre_name}` : "nincs műfaj"}</small></li>
                </ul>
              </div>
            </div>
            </div>
            <div className='button_section all-available-books-other'>
                <button className="btn btn-primary all-available-books-other__btn" variant="primary"  onClick={() => handleShowModal(props.book)}>Részletek</button>
                
                        {/*Pass the selected book title to the modal */}
                  <KonyvKeresModalOtherUser
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      book={selectedBook} 
                  />
              </div>
          </div>      
    )

}

