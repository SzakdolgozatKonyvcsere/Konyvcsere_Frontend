import React from 'react'
import { useState } from 'react';
import KonyvKeresModal from './KonyvKeresModal';

//a keresés funkcióhoz az összes elérhető könyv megmutatása
//modal, tehát a felugró ablak gomb általi mutatása, könvek részleteinek kiirása
export default function KonyvKeresKartyak(props) {


    //console.log("📖 Megjelenő könyv:", props.book); // Check if book exists

    /*if (!props.book) {
        console.error("❌ Hiba: book prop hiányzik!");
        return <p>❌ Hiba történt a könyv betöltésekor.</p>;
    }*/

        const [modalShow, setModalShow] = useState(false);
        const [selectedBookTitle, setSelectedBookTitle] = useState("");

        const handleShowModal = () => {
          setSelectedBookTitle(props.book.title || "Nincs cím");
          setModalShow(true);
      };

    return( 
        <div className="card all-available-books" style={{ width: "18rem" }}>
        <img className='all-available-books__image' src={'/basic_book.png'}></img>
                <div className="card-body all-available-books">
                    <h5 className="card-title all-available-books" style={{border:"none", fontWeight: "bold", textAlign: "center"}}>{props.book.title}</h5>

                    <ul className="list-group list-group-flush all-available-books">
                        <li className="list-group-item all-available-books" style={{ borderRadius: "0", textAlign: "center" }}><small class="text-muted -adat" >{props.book.author_name ? `${props.book.author_name}` : "ismeretlen szerző"}</small></li>
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small class="text-muted -adat" >{props.book.publication_year ? props.book.publication_year : "nincs dátum"}</small></li>
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small class="text-muted -adat" >{props.book.language}</small></li>
                        <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small class="text-muted -adat" >{props.book.publisher_name ?  `${props.book.publisher_name}` : "ismeretlen kiadó"}</small></li>
                        {/*<li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0" }}>{props.book.quality}</li>*/}
                    </ul>
                    <button className="btn btn-primary all-available-books" variant="primary" onClick={handleShowModal}>Részletek</button>
                     {/* Pass the selected book title to the modal */}
                <KonyvKeresModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title={selectedBookTitle} 
                />
                </div>
            </div>      
    )

}



       /*<div className='all-available-books'>
          <div className='all-available-books__details-left'>
            <img className='all-available-books__details-left__image' src={'/basic_book.png'}></img>
          </div>
          <div className='all-available-books__details-right'>
            <p className='all-available-books__details-right__text'><span className='--value'>{props.book.title}</span></p>
            <p className='all-available-books__details-right__text'>kiadó: <span className='--value'>{props.book.publisher_name ?  `${props.book.publisher_name}` : "ismeretlen kiadó"}</span></p>
            <p className='all-available-books__details-right__text'>műfaj: <span className='--value'>{props.book.author_name ? `${props.book.author_name}` : "ismeretlen szerző"}</span></p>
            <p className='all-available-books__details-right__text'>nyelv: <span className='--value'>{props.book.language}</span></p>
            <p className='all-available-books__details-right__text'>kiadás éve: <span className='--value'>{props.book.publication_year ? props.book.publication_year : "nincs dátum"}</span></p>
            <p className='all-available-books__details-right__text'>minőség: <span className='--value'>{props.book.quality}</span></p>
          </div> 
          <div>
          <a href="#" className="btn btn-primary">Megtekintés</a>
          </div>
        </div>*/
