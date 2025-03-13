import { useState } from 'react';
import useApiContext from '../contexts/ApiContext';
import KonyvKeresKartyak from './KonyvKeresKartyak';

export default function KonyvKereses() {

    const { availableBookLista } = useApiContext();
    const [szurtLista, setSzurtLista] = useState([...availableBookLista]);
    const [szuroertek, setSzuroErtek] = useState();

    function handleSearch(e) {
        setSzuroErtek(e.target.value)
        let atmeneti = availableBookLista.filter((book) => {

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

        </div>
    )
}