import { createContext, useState } from "react";
import { myAxios } from "../api/axios";
import { Navigate } from "react-router-dom";

export const BookuploadContext = createContext();

export const BookuploadProvider = ({ children }) => {

    //const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [works, setWorks] = useState([]);

    const csrf = () => myAxios.get("/sanctum/csrf-cookie");


  const uploadWork = async ({...adat}, vegpont) => {
    try {
      await myAxios.post(vegpont, adat);
      console.log("Sikeres műfeltöltés:", adat);
  }catch (err) {
      console.error("Hiba a mű feltöltése közben:", err);
      if (err.response) {
          console.error("Szerver válasza:", err.response.data);
      }
  }
  }

    const uploadBook = async ({...adat}, vegpont) => {

        await csrf();
    console.log(adat, vegpont);
    try {
        await myAxios.post(vegpont, adat);
        console.log("Sikeres könyvfeltöltés:", adat);
        //Navigate("/feltoltottkonyvek");
    }catch (err) {
        console.error("Hiba a könyv feltöltése közben:", err);
        if (err.response) {
            console.error("Szerver válasza:", err.response.data);
        }
    }

    /* 
    const uploadBook = async (bookData) => {
        //setLoading(true);
        //setError(null);
        try {
            const response = await myAxios.post("/api/konyvfeltoltes", bookData);
            setBooks((prevBooks) => [...prevBooks, response.data.book]); // Frissítés lokálisan
            console.log("Sikeres feltöltés:", response.data);
            //setLoading(false);
            return response.data;
        } catch (err) {
            console.error("Hiba a könyv feltöltése közben:", err);
            //setError(error);
            //setLoading(false);
            throw err;
        }*/
      };

      return (
        <BookuploadContext.Provider value={{ works, uploadWork, books, uploadBook }}>
          {children}
        </BookuploadContext.Provider>
      );

}


/*import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myAxios } from "../api/axios";

export const BookuploadContext = createContext();

export const BookProvider = ({ children }) => {
  //const [konyvekLista, setKonyvekLista]=useState([]);
  
  
  //const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Amíg tölt az oldal ne jelenlenek meg az adatok
  //const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [bookLista, setBookLista] = useState([]);


    const addBooks = async (konyvadat) => {
        try {
          const response = await myAxios.post("/api/booksupload", konyvadat);
          setBookLista(response.data);
        } catch (error) {
          if (error.response && error.response.status !== 401) {
            console.log("Hiba:" + error.message);
          }
        } finally{
          setLoading(false); // Stop loading after post request
        }
      };
      
/* 
      const postBooks = async(vegpont,adat)=>{
        try{
            const response = await myAxios.post(vegpont,adat);
            //console.log("adat:", response.data)
        }catch(error){
            console.log("Hiba",error);
        }finally{
        }
      }
    
    
      useEffect(()=>{
        //getUsers("/api/users", setUserLista)
        addBooks("/api/booksupload", setBookLista)
      },[])
    
    
      return (
        <BookuploadContext.Provider value={{ addBooks }}>
          {children}
        </BookuploadContext.Provider>
      );
    };*/

