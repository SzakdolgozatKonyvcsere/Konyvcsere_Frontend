import { useEffect, useState } from 'react';
import useApiContext from '../../contexts/ApiContext';
import KonyvKeresKartyak from './KonyvKeresKartyak';



export default function KonyvKereses() {

    const { availableBookLista, getAllAvailableOfferedBooks, setAvailableBookLista } = useApiContext();
    const [szurtLista, setSzurtLista] = useState([...availableBookLista]);
    const [szuroertek, setSzuroErtek] = useState("");
    const [szerzo, setSzerzo] = useState(""); // Author
    const [minEv, setMinEv] = useState(""); // Min Year
    const [maxEv, setMaxEv] = useState(""); // Max Year
    const [minoseg, setMinoseg] = useState(""); // Quality
    const [kiado, setKiado] = useState(""); // Publisher

    useEffect(() => {
        setSzurtLista(availableBookLista);
    }, [availableBookLista]);

    

    function handleSearch(e) {
        //console.log(availableBookLista)
        const ujszuroertek = e.target.value; 
        setSzuroErtek(ujszuroertek);

        //setSzuroErtek(e.target.value)

        //console.log("🔍 Search Term:", szuroertek);
    //console.log("📚 Available Books Before Filter:", availableBookLista);
        const atmeneti = availableBookLista.filter((book) => {

            return (
                (szuroertek === "" || book.title.toLowerCase().includes(ujszuroertek.toLowerCase())) &&
                (szerzo === "" || book.author.toLowerCase().includes(szerzo.toLowerCase())) &&
                (minEv === "" || book.publication_year >= parseInt(minEv)) &&
                (maxEv === "" || book.publication_year <= parseInt(maxEv)) &&
                (minoseg === "" || book.quality === parseInt(minoseg)) &&
                (kiado === "" || book.publisher_name.toLowerCase().includes(kiado.toLowerCase()))
            );
            }

        );
        //console.log(atmeneti)
        setSzurtLista([...atmeneti])
        console.log(szurtLista)
    }



    return (

        
      
        <div>
            <h1>Könyvek keresése</h1>
            {/* Filter bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "15px" }}>
                <input type="text" placeholder="Keresés cím alapján..." value={szuroertek} onChange={(e) => setSzuroErtek(e.target.value)} style={{ padding: "5px", flex: "1" }} />
                <input type="text" placeholder="szerzo" value={szerzo} onChange={(e) => setSzerzo(e.target.value)} style={{ padding: "5px", flex: "1" }} />
                <input type="number" placeholder="minEv" value={minEv} onChange={(e) => setMinEv(e.target.value)} style={{ padding: "5px", width: "100px" }} />
                <input type="number" placeholder="maxEv" value={maxEv} onChange={(e) => setMaxEv(e.target.value)} style={{ padding: "5px", width: "100px" }} />
                <select value={minoseg} onChange={(e) => setMinoseg(e.target.value)} style={{ padding: "5px" }}>
                    <option value="">Minőség</option>
                    <option value="1">1 - Nagyon rossz</option>
                    <option value="2">2 - Rossz</option>
                    <option value="3">3 - Közepes</option>
                    <option value="4">4 - Jó</option>
                    <option value="5">5 - Kiváló</option>
                </select>
                <input type="text" placeholder="Kiadó" value={kiado} onChange={(e) => setKiado(e.target.value)} style={{ padding: "5px", flex: "1" }} />
                <button onClick={handleSearch} style={{ padding: "5px 10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>Keresés</button>
            </div>
            <input
                type="text"
                placeholder="Keresés könyvcím alapján..."
                value={szuroertek}
                onChange={(e) => handleSearch(e)}
                style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
            />
            <button className='btn btn-primary'>További feltételek</button>
         {/* Debugging Output 
    <p>📢 Szűrt lista hossza: {szurtLista.length}</p>
    <pre>{JSON.stringify(szurtLista, null, 2)}</pre>*/}
            
{/* végigmenni a szurtLista-n  
          <div className='user-book-offers'>
            <div className='user-book-offers__details-left'>
              <img className='user-book-offers__details-left__image' src={'/basic_book.png'}></img>
            </div>*/}
            <div className="konyv">
                {szurtLista.length > 0 ? (
                    szurtLista.map((book)=>{
                        return <KonyvKeresKartyak book={book} key={book.id} />
                    })) : (<p>Nincs találat.</p>)}
          </div>
            
        </div>
        
    )
}
