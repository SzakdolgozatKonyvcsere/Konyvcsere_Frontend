import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { BookuploadContext } from "../contexts/BookuploadContext";
import { myAxios } from "../api/axios";

export default function Konyvfeltoltes() {

  const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
  const { uploadBook, uploadWork } = useContext(BookuploadContext);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  //const [books, setBooks] = useState([]);
  //const [works, setWorks] = useState([]);

  //const navigate = useNavigate();
 
  //műfajok:
  const [genres, setGenres] = useState([]); // Műfajok listája
  const [selectedGenre, setSelectedGenre] = useState(""); // Kiválasztott műfaj

  //sima:
  const [user, setUser] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publication_year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [quality, setQuality] = useState("");
  const [img_url, setImg_url] = useState(null);
  const imgInputRef = useRef(null);
  //const [image, setImage] = useState(null);


  // műfaj lekérése: 
  useEffect(() => {
    myAxios.get("/api/genres")
      .then(response => {
        setGenres(response.data); // Beállítjuk a műfajokat
      })
      .catch(error => {
        console.error("Hiba a műfajok lekérése közben:", error);
      });
  }, []);

  useEffect(() => {
    if (authUser) {
      setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
    }
  }, [authUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const types = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (file && !types.includes(file.type)) {
      alert('Csak jpg, png, gif, jpeg, vagy svg képfájlokat tölthetsz fel.');
      return;
    }
    setImg_url(file);
  }

  const resetForm = () => {
    setAuthor("");
    setTitle("");
    setPublisher("");
    setYear("");
    setSelectedGenre("");
    setLanguage("");
    setQuality("");
    setImg_url(null);
    if (imgInputRef.current) {
      imgInputRef.current.value = null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const konyvAdat = new FormData();
    konyvAdat.append("user", user);
    konyvAdat.append("authors", author);
    konyvAdat.append("title", title);
    konyvAdat.append("publisher", publisher);
    konyvAdat.append("publication_year", publication_year);
    konyvAdat.append("genre_id", Number(selectedGenre));
    konyvAdat.append("language", language);
    konyvAdat.append("quality", quality);
    if (img_url) konyvAdat.append("img_url", img_url);
    
    try {
      const response = await uploadBook(konyvAdat, "/api/konyvfeltoltes");
      console.log("Sikeres válasz:", response.data);
      setMessage("✅ Könyv sikeresen feltöltve!");
      resetForm();
      setRefresh(true);
    } catch (error) {
      console.error("Hiba a könyv feltöltésekor:", error);
    }
  };

  return (
    <div className="card max-w-lg mx-auto mt-10 p-5">
      <h1 className="text-center">Könyvfeltöltés</h1>

      <form onSubmit={handleSubmit}>
        {message && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300 text-sm">
            {message}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Cím</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" name="title" required />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Szerző</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" name="author" required />
        </div>

        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Kiadó</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="form-control" id="publisher" name="publisher" required />
        </div>

        <div className="mb-3">
          <label htmlFor="publication_year" className="form-label">Év</label>
          <input type="number" value={publication_year} onChange={(e) => setYear(Number(e.target.value))} className="form-control" id="publication_year" name="publication_year" min={1700} max={new Date().getFullYear()} required />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Műfaj</label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            required
          >
            <option value="">-- Válassz műfajt --</option>
            {genres.map((genre) => (
              <option key={genre.genre_id} value={genre.genre_id}>
                {genre.genre_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="language" className="form-label">Nyelv</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" id="language" name="language" required />
        </div>

        <div className="mb-3">
          <label htmlFor="quality" className="form-label">Minőség 1-5 </label>
          <input type="number" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="form-control" id="quality" name="quality" min={1} max={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Kép</label>
          <input type="file" ref={imgInputRef} onChange={handleImageChange} className="form-control" id="image" accept="image/jpeg, image/png, image/gif, image/svg+xml" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Könyv feltöltése</button>
      </form>
    </div>
  );
}
