import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { BookuploadContext } from "../contexts/BookuploadContext";
import { myAxios } from "../api/axios";

export default function Konyvfeltoltes() {
  const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
  const { uploadBook, uploadWork } = useContext(BookuploadContext);
 
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




  const handleSubmit = async (e) => {
    e.preventDefault();

    const konyvAdat = {
      user,
      author,
      title,
      publisher,
      publication_year,
      genre_id: Number(selectedGenre), // A kiválasztott műfaj az ID alapján
      language,
      quality,
    };
    console.log("Feltöltött könyv", konyvAdat);
  
    uploadBook(konyvAdat, "/api/konyvfeltoltes");

}

 /* const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
  const { uploadBook, uploadWork } = useContext(BookuploadContext);
  //const [books, setBooks] = useState([]);
  //const [works, setWorks] = useState([]);

  const navigate = useNavigate();

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
  const allowdTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
if (file && !allowdTypes.includes(file.type)){
  alert('Csak jpg, png, gif, jpeg, vagy svg képfájlokat tölthetsz fel.');
  return;
}
setImg_url(file);
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const konyvAdat = new FormData();
  konyvAdat.append('user', user);
  konyvAdat.append('author', author);
  konyvAdat.append('title', title);
  konyvAdat.append('publisher', publisher);
  konyvAdat.append('publication_year', publication_year);
  konyvAdat.append('genre_id', selectedGenre);
  konyvAdat.append('language', language);
  konyvAdat.append('quality', quality);

  if (img_url) {
    konyvAdat.append('img_url', img_url);
  }

  try {
    const response = await myAxios.post("/api/konyvfeltoltes", konyvAdat, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Sikeres feltöltés:", response.data);

    // Kép URL frissítése
    if (response.data.img_url) {
      setImg_url(response.data.img_url);
    }

    // Átirányítás a sikeres feltöltés után
    navigate("/feltoltottkonyvek");

  } catch (err) {
    console.error("Feltöltési hiba:", err.response?.data || err);
    alert("Hiba történt a könyv feltöltésekor!");
  }
};
      //useNavigate=("/feltoltottkonyvek"); /ezzel van a baja!!
    
    const konyvAdat = {
      user,
      author,
      title,
      publisher,
      publication_year,
      genre_id: Number(selectedGenre), // A kiválasztott műfaj az ID alapján
      language,
      quality,
      img_url:null,
    };
    console.log("Feltöltött könyv", konyvAdat);
    //uploadWork( konyvAdat, "/api/mufeltoltes")
   // uploadBook(konyvAdat, "/api/konyvfeltoltes");

  /*try {
    const result = await uploadBook(konyvAdat);
    console.log("Sikeres feltöltés:", result);
    navigate("/feltoltottkonyvek"); // átirányítás a saját könyvek oldalra
  } catch (err) {
    // Hibakezelés itt, ha szükséges
    console.error("Feltöltési hiba:", err);
  }
  console.log("hm")

    await uploadBook(konyvAdat); // Könyv elküldése Contexten keresztül
    navigate("/feltoltottkonyvek"); // Átirányítás a könyvlistához
    */

  return (
    <div className="card max-w-lg mx-auto mt-10 p-5">
      <h1 className="text-center">Könyvfeltöltés</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="title" className="form-label">Cím</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" name="title" required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Szerző</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" name="author" required />
        </div>
        {/*több szerző gomb?*/} 
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
          
          {/*<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre" name="genre" required />*/}
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
          {/*<div className="mb-3">
          <label htmlFor="image" className="form-label">Kép</label>
          <input type="file" onChange={handleImageChange} className="form-control" id="image" accept="image/jpeg, image/png, image/gif, image/svg+xml"/>
          </div>*/}
          <button type="submit" className="btn btn-primary w-100">Feltöltés</button>
          </form>
        </div>
          /*<Form.Group controlId="img_url">
        <Form.Label>Kép</Form.Label>
        <Form.Control
          type="file"
          name="img_url"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
          onChange={handleChange}
        />
      </Form.Group>*/

  );
}  
          
          
        
     


/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Konyvfeltoltes() {
  const [id, setId] = useState("");
  const [user, setUser] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);

  const { user : authUser } = useAuthContext();
  const navigate = useNavigate();

  /*useEffect(() => {
    if (!authUser) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [authUser, navigate]);

  if (loading) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const konyvAdat = {
      id,
      user,
      author,
      title,
      publisher,
      year,
      genre,
      language,
      image,
    };
    console.log("Feltöltött könyv", konyvAdat);
  };

  return (
    <div className="card max-w-lg mx-auto mt-10 p-5">
      <h1 className="text-center">Könyvfeltöltés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label"></label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="form-control" id="id" name="id" required />
        </div>
        <div className="mb-3">
          <label htmlFor="user" className="form-label"></label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="form-control" id="user" name="user" required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label"></label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" name="author" required />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" name="title" required />
        </div>
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label"></label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="form-control" id="publisher" name="publisher" required />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label"></label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" id="year" name="year" required />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label"></label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre" name="genre" required />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label"></label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" id="language" name="language" required />
        </div>
        <div className="mb-3">
          <label htmlFor="coverImage" className="form-label"></label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="coverImage" name="coverImage" required />
        </div>
        <button type="submit" className="btn btn-primary w-100"></button>
      </form>
    </div>
  );
}*/
