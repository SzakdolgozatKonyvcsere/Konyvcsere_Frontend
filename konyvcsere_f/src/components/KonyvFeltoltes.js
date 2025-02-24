import { useEffect, useState } from "react";
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
  //const [image, setImage] = useState(null);

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
    };
    console.log("Feltöltött könyv", konyvAdat);
  }



  return (
    <div className="card max-w-lg mx-auto mt-10 p-5">
      <h1 className="text-center">Könyvfeltöltés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">id</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} className="form-control" id="id" name="id" required />
        </div>
        <div className="mb-3">
          <label htmlFor="user" className="form-label">felh</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} className="form-control" id="user" name="user" required />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Szerző</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" name="author" required />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Cím</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" name="title" required />
        </div>
        <div className="mb-3">
          <label htmlFor="publisher" className="form-label">Kiadó</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="form-control" id="publisher" name="publisher" required />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">Év</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" id="year" name="year" required />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Műfaj</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre" name="genre" required />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">Nyelv</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control" id="language" name="language" required />
        </div>
        
        <button type="submit" className="btn btn-primary w-100">Feltöltés</button>
      </form>
    </div>
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
