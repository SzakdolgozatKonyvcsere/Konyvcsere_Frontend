import React from 'react'


export default function KonyvKeresKartyak(props) {


    //console.log("📖 Megjelenő könyv:", props.book); // Check if book exists

    /*if (!props.book) {
        console.error("❌ Hiba: book prop hiányzik!");
        return <p>❌ Hiba történt a könyv betöltésekor.</p>;
    }*/

    return(
        
        <div className="card" style={{ width: "18rem" }}>
        <img className='user-book-offers__details-left__image' src={'/basic_book.png'}></img>
                <div className="card-body">
                    <h5 className="card-title">{props.book.title}</h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{props.book.author_name ? `${props.book.author_name}` : "ismeretlen szerző"}</li>
                        <li className="list-group-item">{props.book.publication_year ? props.book.publication_year : "nincs dátum"}</li>
                    </ul>
                    <a href="#" className="btn btn-primary">Részletek</a>
                </div>
            </div>
          
         
        

        
    )

}

       /*<div className='user-book-offers__details-right'>
            <p className='user-book-offers__details-right__text'>cím: <span className='--value'>{props.book.title}</span></p>
            <p className='user-book-offers__details-right__text'>kiadó: <span className='--value'>{props.book.publisher_name}</span></p>
            <p className='user-book-offers__details-right__text'>műfaj: <span className='--value'>{props.book.author_name}</span></p>
            {/*<p className='user-book-offers__details-right__text'>nyelv: <span className='--value'>{props.book.language}</span></p>*/
            //<p className='user-book-offers__details-right__text'>kiadás éve: <span className='--value'>{props.book.publication_year}</span></p>
            /*<p className='user-book-offers__details-right__text'>minőség: <span className='--value'>{props.book.quality}</span></p>*/
            //<p className='user-book-offers__details-right__text'>állapot: <span className='--value'>{props.book.book_status}</span></p>
          //</div> */
