import { useEffect, useMemo, useState } from "react";
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
    minYear: 1700,
    maxYear: new Date().getFullYear(),
  });
  //const [filteredBooks, setFilteredBooks] = useState([...availableBookLista]);

  useEffect(() => {
    getAllAvailableOfferedBooks(); // <--- EZ FONTOS!
  }, [getAllAvailableOfferedBooks]);
  
  /*useEffect(() => {
    if (availableBookLista && availableBookLista.length > 0) {
      setSzurtLista([...availableBookLista]);
      console.log("Könyvek betöltve:", availableBookLista);
      setIsLoading(false)
    } else {
      console.log("❌ Még nincs adat, várunk...");
    }
  }, [availableBookLista]);*/
  

  const filteredBooks = useMemo(() => {
    if (!availableBookLista) return [];
    return availableBookLista.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const author = (book.authors || "").toLowerCase();
      const publisher = (book.publisher_name || "").toLowerCase();
      const year = parseInt(book.publication_year) || 0;

      return (
        title.includes(szuroertek.toLowerCase()) &&
        (!filters.author || author.includes(filters.author.toLowerCase())) &&
        (!filters.publisher || publisher.includes(filters.publisher.toLowerCase())) &&
        year >= filters.minYear &&
        year <= filters.maxYear
      );
    });
  }, [availableBookLista, szuroertek, filters]);

  function handleReset() {
    setSzuroErtek(""); // Visszaállítja a keresési értéket üresre
    //setSzurtLista([...availableBookLista]); // Visszaállítja a könyvlistát az eredeti listára
    setFilters({ author: "", publisher: "", minYear: 1700, maxYear: new Date().getFullYear() })
}

  

  return (
    <div>
    <div className="konyvkeresKezel">
    <h1>Könyvek keresése</h1>
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Keresés könyvcím alapján..."
        value={szuroertek}
        onChange={(e) => setSzuroErtek(e.target.value)}
      />
      <label>Keresés könyvcím alapján...</label>
    </div>

    <Accordion className="mb-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>További feltételek</Accordion.Header>
        <Accordion.Body>
          <div className="row g-2 mb-3">
            <div className="col-md">
              <input
                type="text"
                className="form-control"
                placeholder="Szerző..."
                value={filters.author}
                onChange={(e) => setFilters(f => ({ ...f, author: e.target.value }))}
              />
            </div>
            <div className="col-md">
              <input
                type="text"
                className="form-control"
                placeholder="Kiadó..."
                value={filters.publisher}
                onChange={(e) => setFilters(f => ({ ...f, publisher: e.target.value }))}
              />
            </div>
          </div>
          <KonyvKeresRange
            range={[filters.minYear, filters.maxYear]}
            setRange={([min, max]) => setFilters(f => ({ ...f, minYear: min, maxYear: max }))}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    <button className="btn btn-secondary me-2" onClick={handleReset}>
      Reset
    </button>

    <div className="konyv row gx-3 gy-4 mt-4">
      {filteredBooks.map(book => (
        
          <KonyvKeresKartyak book={book} key={book.offer_id}/>
        
      ))}
    </div>
    </div>
  </div>
  );
}
