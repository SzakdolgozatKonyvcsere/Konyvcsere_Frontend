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


