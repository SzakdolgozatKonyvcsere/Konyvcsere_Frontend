import React from 'react'


export default function KonyvKeresKartyak(props) {




    return(
        <>
        
          <div className='user-book-offers__details-right'>
            <p className='user-book-offers__details-right__text'>cím: <span className='--value'>{props.book.title}</span></p>
            <p className='user-book-offers__details-right__text'>kiadó: <span className='--value'>{props.book.publisher_name}</span></p>
            <p className='user-book-offers__details-right__text'>műfaj: <span className='--value'>{props.book.author_name}</span></p>
            {/*<p className='user-book-offers__details-right__text'>nyelv: <span className='--value'>{props.book.language}</span></p>*/}
            <p className='user-book-offers__details-right__text'>kiadás éve: <span className='--value'>{props.book.publication_year}</span></p>
            {/*<p className='user-book-offers__details-right__text'>minőség: <span className='--value'>{props.book.quality}</span></p>*/}
            <p className='user-book-offers__details-right__text'>állapot: <span className='--value'>{props.book.book_status}</span></p>
          </div> 
         
        </>
    )


   
}


/*
<>
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{props.book.title}</h5>

                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.book.author ? `${book.author}` : "ismeretlen szerző"}</li>
                        <li class="list-group-item">{props.book.publication_year ? book.publication_year : "nincs dátum"}</li>
                    </ul>
                    <a href="#" class="btn btn-primary">Részletek</a>
                </div>
            </div>

        </>
*/