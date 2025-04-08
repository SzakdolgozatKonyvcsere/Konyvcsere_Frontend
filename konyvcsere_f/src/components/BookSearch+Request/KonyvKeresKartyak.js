import React from 'react'
import { useState } from 'react';
import KonyvKeresModal from './KonyvKeresModal';

//a keresés funkcióhoz az összes elérhető könyv megmutatása
//modal, tehát a felugró ablak gomb általi mutatása, könvek részleteinek kiirása
export default function KonyvKeresKartyak(props) {
        const [modalShow, setModalShow] = useState(false);
        const [selectedBook, setSelectedBook] = useState(null);

        const handleShowModal = (book) => {
          if (book){
            setSelectedBook(book);
            setModalShow(true);       
          }
      };

    return( 
        <div className="card all-available-books" style={{ width: "18rem" }}>
        <img className='all-available-books__image' src={props.book.img_url ? `http://localhost:8000/${props.book.img_url}` : '/basic_book.png'}></img>
                <div className="card-body all-available-books">
                    <h5 className="card-title all-available-books" style={{border:"none", fontWeight: "bold", textAlign: "center"}}>{props.book.title || "Nincs cím"}</h5>

                    <ul className="list-group list-group-flush all-available-books">
                        <li className="list-group-item all-available-books" style={{ borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{props.book.authors ? `${props.book.authors}` : "ismeretlen szerző"}</small></li>
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{props.book.publisher_name ?  `${props.book.publisher_name}` : "ismeretlen kiadó"} Kiadó</small></li>
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{props.book.publication_year ? props.book.publication_year : "nincs dátum"}</small></li>
                        {/*<li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{props.book.language ? `${props.book.language}` : "nincs nyelv"}</small></li>*/}
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{props.book.genre_name ? `${props.book.genre_name}` : "nincs műfaj"}</small></li>
                    </ul>
                    <button className="btn btn-primary all-available-books" variant="primary"  onClick={() => handleShowModal(props.book)}>Részletek</button>
                      {/*Pass the selected book title to the modal */}
                <KonyvKeresModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    book={selectedBook} 
                />
                </div>
            </div>      
    )

}


