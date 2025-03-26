import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import KonyvKeresKartyak from "./KonyvKeresKartyak";
import { KonyvKeresModal } from "./KonyvKeresModal";
import KonyvKeresRange from "./KonyvKeresRange";


export default function KonyvKereses() {
  const {
    availableBookLista,
  } = useApiContext();
  const [szurtLista, setSzurtLista] = useState([...availableBookLista]);
  const [szuroertek, setSzuroErtek] = useState("");
  //const [finalFilteredBooks, setFinalFilteredBooks] = useState([...availableBookLista]);

  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    language: "",
    minYear: 1930,
    maxYear: new Date().getFullYear(),
  });
  //const [filteredBooks, setFilteredBooks] = useState([...availableBookLista]);
  
  useEffect(() => {
    setSzurtLista(availableBookLista);
    
  }, [availableBookLista]);

  function handleSearch(e) {
    //console.log(availableBookLista)
    const ujszuroertek = e.target.value.toLowerCase();
    setSzuroErtek(ujszuroertek);

    const atmeneti = availableBookLista.filter((book) => {
        console.log("Ellenőrzés: ", book);
        return book.title.toLowerCase().includes(szuroertek);
      
    });
    //console.log(atmeneti)
    setSzurtLista([...atmeneti]);
    console.log(szurtLista);
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

    console.log("Szűrt könyvek:", finalFilteredBooks); // Debug log
    setSzurtLista([...finalFilteredBooks]);
    
  }

  return (
    <div>
    <div className="konyvkeresKezel">
      <h1>Könyvek keresése</h1>
      
        <div class="form-floating mb-3">
            <input
            type="text" className="form-control" id="floatingTitle"
            placeholder="Keresés könyvcím alapján..."
            value={szuroertek}
            onChange={(e) => handleSearch(e)}   
        />
            <label for="floatingTitle">Keresés könyvcím alapján...</label>
      </div>
      <div>
        <h3>További feltételek:</h3>
        <div class="row g-2">
            <div class="col-md">
                <div className="form-floating">
                    <input
                        type="text" className="form-control" id="floatingAuthor"
                        placeholder="Keresés szerző alapján..."
                        value={filters.author}
                        onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                        
                    />
                    <label for="floatingAuthor">Keresés szerző alapján...</label>
                </div>
            </div>
        <div class="col-md">
            <div className="form-floating">
                <input
                    type="text" className="form-control" id="floatingPublisher"
                    placeholder="Keresés kiadó alapján..." 
                    value={filters.publisher}
                    onChange={(e) =>
                    setFilters({ ...filters, publisher: e.target.value })
                    }
                    
                />
                <label for="floatingPublisher">Keresés kiadó alapján...</label>
            </div>
        </div>
        </div>
        <div style={{ margin:"40px" }}>
          <KonyvKeresRange
          range={[filters.minYear, filters.maxYear]}
          setRange={(newRange) => setFilters({ ...filters, minYear: newRange[0], maxYear: newRange[1] })}
        />
          
        </div>
        
      </div>
      <button className="btn btn-primary" onClick={handleFilterApply} style={{ marginBottom: "20px" }}>
        {" "}
        Alkalmaz{" "}
      </button>
      
        </div>
      <div className="konyv">
        {szurtLista.length > 0 ? (
          szurtLista.map((book) => {
            return <KonyvKeresKartyak book={book} key={book.id} />;
          })
        ) : (
          <p>Nincs találat.</p>
        )}
      </div>
    </div>
  );
}
