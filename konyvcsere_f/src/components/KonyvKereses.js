import { useState } from 'react';
import useApiContext from '../contexts/ApiContext';
import KonyvKeresKartyak from './KonyvKeresKartyak';

export default function KonyvKereses() {

    const { availableBookLista } = useApiContext();
    const [szurtLista, setSzurtLista] = useState([...availableBookLista]);
    const [szuroertek, setSzuroErtek] = useState("");

    function handleSearch(e) {
        console.log(availableBookLista)
        //const ujszuroertek = e.target.value; 
        //setSzuroErtek(ujszuroertek);

        setSzuroErtek(e.target.value)
        const atmeneti = availableBookLista.filter((book) => {

            return book.title.includes(szuroertek);
        }

        );
      
        setSzurtLista([...atmeneti])
        console.log(szurtLista)
    }



    return (
        <div>
            <h1>Könyvek keresése</h1>
            <input
                type="text"
                placeholder="Keresés könyvcím alapján..."
                value={szuroertek}
                onChange={(e) => handleSearch(e)}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
            />

            
{/* végigmenni a szurtLista-n  */}
<div className='user-book-offers'>
          <div className='user-book-offers__details-left'>
            <img className='user-book-offers__details-left__image' src={'/basic_book.png'}></img>
          </div>
            
                {szurtLista.map((book)=>{
                        return <KonyvKeresKartyak book={book} key={book.id} />
                    })}
            </div>
            
        </div>
    )
}
