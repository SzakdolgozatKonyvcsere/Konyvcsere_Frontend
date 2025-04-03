import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import KonyvKeresKartyak from "./KonyvKeresKartyak";
import { KonyvKeresModal } from "./KonyvKeresModal";
import KonyvKeresRange from "./KonyvKeresRange";
//import { Accordion } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';



export default function KonyvKereses() {
  const {
    availableBookLista, getAllAvailableOfferedBooks
  } = useApiContext();
  const [szurtLista, setSzurtLista] = useState([]);
  const [szuroertek, setSzuroErtek] = useState("");
  //const [finalFilteredBooks, setFinalFilteredBooks] = useState([...availableBookLista]);
  //const isBooksLoaded = availableBookLista && availableBookLista.length > 0;
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    language: "",
    genre_name:"",
    minYear: 1930,
    maxYear: new Date().getFullYear(),
  });
  //const [filteredBooks, setFilteredBooks] = useState([...availableBookLista]);

  useEffect(() => {
    getAllAvailableOfferedBooks(); // <--- EZ FONTOS!
  }, []);
  
  useEffect(() => {
    if (availableBookLista && availableBookLista.length > 0) {
      setSzurtLista([...availableBookLista]);
      console.log("Könyvek betöltve:", availableBookLista);
      setIsLoading(false)
    } else {
      console.log("❌ Még nincs adat, várunk...");
    }
  }, [availableBookLista]);
  



  function handleReset() {
    setSzuroErtek(""); // Visszaállítja a keresési értéket üresre
    setSzurtLista([...availableBookLista]); // Visszaállítja a könyvlistát az eredeti listára
}

  function handleSearch(e) {
    //console.log(availableBookLista)
    const ujszuroertek = e.target.value.toLowerCase();
    setSzuroErtek(ujszuroertek);
    console.log("ujszuroertek: ", ujszuroertek)
    console.log("szuroertek: ", szuroertek)

    const atmeneti = availableBookLista.filter((book) => {
        console.log("Ellenőrzés: ", book);
        return book.title.toLowerCase().includes(ujszuroertek);
        
    });
    //console.log(atmeneti)
    setSzurtLista([...atmeneti]);
    console.log("atmeneti: ", atmeneti);
    console.log("szurtlista: ", szurtLista);
    
  }




  function handleFilterApply() {
    console.log("handleFilterApply lefutott");
    console.log("elérhető könyvek a szűrés előtt:", availableBookLista);
    console.log("szűrési feltételek:", filters);
  

    const finalFilteredBooks = availableBookLista.filter((book) => {
      console.log("🔎 Vizsgált könyv:", book);
        // Alapértelmezett üres értékekkel védekezünk az undefined ellen
        const bookAuthors = book.authors ? book.authors.toLowerCase() : "";
        const bookPublisher = book.publisher_name ? book.publisher_name.toLowerCase() : "";
        const bookYear = book.publication_year ? parseInt(book.publication_year) : null;


        const filterAuthor = filters.author ? filters.author.toLowerCase() : "";
        const filterPublisher = filters.publisher ? filters.publisher.toLowerCase() : "";

        const megfelel = (
            (!filterAuthor || bookAuthors.includes(filterAuthor)) &&
            (!filterPublisher || bookPublisher.includes(filterPublisher)) &&
            (bookYear === null || (bookYear >= filters.minYear && bookYear <= filters.maxYear))
        );
      console.log("✅ Megfelel?", megfelel);

    return megfelel;
    });

    console.log("Szűrt könyvek:", finalFilteredBooks); 
    setSzurtLista([...finalFilteredBooks]);
    
  }

  return (
    <div>
    <div className="konyvkeresKezel">
      <h1>Könyvek keresése</h1>
      
        <div className="form-floating mb-3">
            <input
            type="text" className="form-control" id="floatingTitle"
            placeholder="Keresés könyvcím alapján..."
            value={szuroertek}
            onChange={(e) => handleSearch(e)}   
        />
            <label htmlFor="floatingTitle">Keresés könyvcím alapján...</label>
      </div>
      <div>
      <Accordion className="acc">
      <Accordion.Item eventKey="0" className="accI">
        <Accordion.Header className="accH"><h3>További feltételek:</h3></Accordion.Header>
        <Accordion.Body className="accB">
        <div className="row g-2">
        <div className="col-md">
            <div className="form-floating">
                <input
                    type="text" className="form-control" id="floatingAuthor"
                    placeholder="Keresés szerző alapján..."
                    value={filters.author}
                    onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                    
                />
                <label htmlFor="floatingAuthor">Keresés szerző alapján...</label>
            </div>
        </div>
    <div className="col-md">
        <div className="form-floating">
            <input
                type="text" className="form-control" id="floatingPublisher"
                placeholder="Keresés kiadó alapján..." 
                value={filters.publisher}
                onChange={(e) =>
                setFilters({ ...filters, publisher: e.target.value })
                }
                
            />
            <label htmlFor="floatingPublisher">Keresés kiadó alapján...</label>
        </div>
    </div>
    </div>
    <div style={{ margin:"40px" }}>
      <KonyvKeresRange
      range={[filters.minYear, filters.maxYear]}
      setRange={(newRange) => setFilters({ ...filters, minYear: newRange[0], maxYear: newRange[1] })}
    />
      
    </div>
    <button className="btn btn-primary alkalmaz-button" onClick={handleFilterApply} style={{ marginBottom: "20px" }}>
        {" "}
        Alkalmaz{" "}
      </button>
        
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
        
        
      </div>
      
      <button className="btn btn-primary" onClick={handleReset} style={{ marginBottom: "20px" }}>
      {" "}
      Reset{" "}
      </button>
      
        </div>
      <div className="konyv">
        {
          szurtLista.map((book) => {
            return <KonyvKeresKartyak book={book} key={book.offer_id} />;
          })
        }
      </div>
    </div>
  );
}
