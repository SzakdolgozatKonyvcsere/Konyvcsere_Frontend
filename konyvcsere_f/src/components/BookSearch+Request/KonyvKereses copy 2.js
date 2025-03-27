import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import KonyvKeresKartyak from "./KonyvKeresKartyak";
import { KonyvKeresModal } from "./KonyvKeresModal";
import KonyvKeresRange from "./KonyvKeresRange";

export default function KonyvKereses() {
  const {
    availableBookLista,
    getAllAvailableOfferedBooks,
    setAvailableBookLista,
  } = useApiContext();
  const [szurtLista, setSzurtLista] = useState([...availableBookLista]);
  const [szuroertek, setSzuroErtek] = useState("");

  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    minYear: 1900,
    maxYear: new Date().getFullYear(),
  });
  //const [filteredBooks, setFilteredBooks] = useState([...availableBookLista]);
  
  useEffect(() => {
    setSzurtLista(availableBookLista);
    console.log("📢 Szűrt lista frissült:", szurtLista);
  }, [availableBookLista, szurtLista]);

  function handleSearch(e) {
    //console.log(availableBookLista)
    const ujszuroertek = e.target.value.toLowerCase();
    setSzuroErtek(ujszuroertek);

    //setSzuroErtek(e.target.value)

    //console.log("🔍 Search Term:", szuroertek);
    //console.log("📚 Available Books Before Filter:", availableBookLista);
    const atmeneti = availableBookLista.filter((book) => {
        console.log("Ellenőrzés: ", book);
        return book.title.toLowerCase().includes(szuroertek);
      
    });
    //console.log(atmeneti)
    setSzurtLista([...atmeneti]);
    console.log(szurtLista);
  }

  function handleFilterApply() {
    console.log("🎯 handleFilterApply lefutott!");
    console.log("Elérhető könyvek a szűrés előtt:", availableBookLista); // Debugging log
    console.log("🚀 Szűrési feltételek:", filters);
  

    const finalFilteredBooks = availableBookLista.filter((book) => {
      console.log("🔎 Vizsgált könyv:", book);
        // Alapértelmezett üres értékekkel védekezünk az undefined ellen
        const bookAuthors = book.authors ? book.authors.toLowerCase() : "";
        const bookPublisher = book.publisher_name ? book.publisher_name.toLowerCase() : "";
        const bookYear = parseInt(book.publication_year, 10) || 0; // Biztosítsuk, hogy szám legyen
        
        const filterAuthor = filters.author ? filters.author.toLowerCase() : "";
        const filterPublisher = filters.publisher ? filters.publisher.toLowerCase() : "";

        const megfelel = (
            (!filterAuthor || bookAuthors.includes(filterAuthor)) &&
            (bookYear >= filters.minYear) &&
            (bookYear <= filters.maxYear) &&
            (!filterPublisher || bookPublisher.includes(filterPublisher))
    
        /*(!filters.author === "" ||
          book.authors && book.authors.toLowerCase().includes(filters.author.toLowerCase())) &&
        (bookYear >= filters.minYear) &&
        (bookYear <= filters.maxYear) &&
        (!filters.publisher === "" ||
          book.publisher_name && book.publisher_name
            .toLowerCase()
            .includes(filters.publisher.toLowerCase()))
      */);
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
        <div>
          Keresés évek közt:
          <KonyvKeresRange
            range={[filters.minYear, filters.maxYear]} 
            setRange={(newRange) => setFilters({ ...filters, minYear: newRange[0], maxYear: newRange[1] })} 
          />
          {/*<input
            type="number"
            placeholder="Legrégebbi"
            value={filters.minYear}
            onChange={(e) =>
              setFilters({ ...filters, minYear: e.target.value })
            }
            min={1900}
            max={new Date().getFullYear()}
            style={{ padding: "5px", width: "150px" }}
          />{" "}
          --
          <input
            type="number"
            placeholder="Legújabb"
            value={filters.maxYear}
            onChange={(e) =>
              setFilters({ ...filters, maxYear: e.target.value })
            }
            min={1900}
            max={new Date().getFullYear()}
            style={{ padding: "5px", width: "150px" }}
          />*/}
        </div>
        
      </div>
      <button className="btn btn-primary" onClick={handleFilterApply}>
        {" "}
        Alkalmaz{" "}
      </button>
      {/* Debugging Output 
    <p>📢 Szűrt lista hossza: {szurtLista.length}</p>
    <pre>{JSON.stringify(szurtLista, null, 2)}</pre>*/}

      {/* végigmenni a szurtLista-n  
          <div className='user-book-offers'>
            <div className='user-book-offers__details-left'>
              <img className='user-book-offers__details-left__image' src={'/basic_book.png'}></img>
            </div>*/}
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
