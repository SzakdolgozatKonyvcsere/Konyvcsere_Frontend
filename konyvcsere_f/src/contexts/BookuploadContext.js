import { createContext, useState } from "react";
import { myAxios } from "../api/axios";
import { Navigate } from "react-router-dom";

export const BookuploadContext = createContext();

export const BookuploadProvider = ({ children }) => {

    //const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    //const [works, setWorks] = useState([]);
    const [filters, setFilters] = useState({
            author: "",
        });

    const csrf = () => myAxios.get("/sanctum/csrf-cookie");


    const uploadBook = async ({...adat}, vegpont) => {
      await csrf();
      console.log(adat, vegpont);
    try {
        await myAxios.post(vegpont, adat);
        console.log("Sikeres könyvfeltöltés:", adat);
        alert('Sikeres könyvfeltöltés!');
        
    }catch (err) {
        console.error("Hiba a könyv feltöltése közben:", err);
        if (err.response) {
            console.error("Szerver válasza:", err.response.data);
        }
    }
  }


    return (
      <BookuploadContext.Provider value={{ books, uploadBook }}>
        {children}
      </BookuploadContext.Provider>
    );


     /*const uploadWork = async (e) => {
      e.preventDefault();
      try {
        
        await myAxios.post("/api/mufeltoltes", works);
        console.log("Sikeres műfeltöltés:", works);
        setWorks({ genre_id: "", title: "" });
        
    }catch (err) {
        console.error("Hiba a mű feltöltése közben:", err);
        if (err.response) {
            console.error("Szerver válasza:", err.response.data);
        }
    }
    }
 const uploadWork = async ({...adat}, vegpont) => {
  await csrf();
    try {
      await myAxios.post(vegpont, adat);
      console.log("Sikeres műfeltöltés:", adat);
      //Navigate("/feltoltottkonyvek");
  }catch (err) {
      console.error("Hiba a mű feltöltése közben:", err);
      if (err.response) {
          console.error("Szerver válasza:", err.response.data);
      }
  }
  }*/

  

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
        }
      };*/

     

}

