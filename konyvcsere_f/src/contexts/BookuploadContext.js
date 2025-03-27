import { createContext, useState } from "react";
import { myAxios } from "../api/axios";
import { Navigate } from "react-router-dom";

export const BookuploadContext = createContext();

export const BookuploadProvider = ({ children }) => {

    //const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    //const [works, setWorks] = useState([]);
    
    const csrf = () => myAxios.get("/sanctum/csrf-cookie");


    const uploadBook = async ({...adat}, vegpont) => {
      await csrf();
      console.log("Küldött adat:", adat, vegpont);  // Ellenőrizzük, hogy mi lett küldve
      try {
        await myAxios.post(vegpont, adat);
        console.log("Sikeres könyvfeltöltés:", adat);  
        alert('Sikeresen feltöltötted a könyvet!'); // Success message
          
      } catch (err) {
          console.error("Hiba a könyv feltöltése közben:", err);
          if (err.response) {
              console.error("Szerver válasza:", err.response.data);
          }
      }
  };

  return (
    <BookuploadContext.Provider value={{ books, uploadBook }}>
      {children}
    </BookuploadContext.Provider>
  );
}




/*export const BookuploadProvider = ({ children }) => {

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
      console.log("Küldött adat:", adat, vegpont);  // Ellenőrizzük, hogy mi lett küldve
      try {
          const formData = new FormData();
          formData.append("genre_id", adat.genre_id);
          formData.append("title", adat.title);
          formData.append("publisher", adat.publisher);
          formData.append("author", adat.author);
          formData.append("user", adat.user);
          formData.append("language", adat.language);
          formData.append("publication_year", adat.publication_year);
          formData.append("quality", adat.quality);
          if (adat.img_url) {
              formData.append("img_url", adat.img_url);
          }

          const response = await myAxios.post(vegpont, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
          console.log("Sikeres könyvfeltöltés:", response.data);
          if (response.status === 201) {
            alert('Sikeresen feltöltötted a könyvet!'); // Success message
          }
      } catch (err) {
          console.error("Hiba a könyv feltöltése közben:", err);
          if (err.response) {
              console.error("Szerver válasza:", err.response.data);
          }
      }
  };

  const uploadWork = async ({ ...adat }, vegpont) => {
    await csrf();
    try {
      const response = await myAxios.post(vegpont, adat);
      console.log("Sikeres műfeltöltés:", response.data);
    } catch (err) {
      console.error("Hiba a mű feltöltése közben:", err);
      if (err.response) {
        console.error("Szerver válasza:", err.response.data);
      }
    }
  };

  return (
    <BookuploadContext.Provider value={{ books, uploadBook, uploadWork }}>
      {children}
    </BookuploadContext.Provider>
  );
};*/

    /*try {
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


     const uploadWork = async (e) => {
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


