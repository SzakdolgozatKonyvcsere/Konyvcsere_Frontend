import React, { useContext, useEffect } from 'react'
import { createContext, useState } from "react";
import { myAxios } from "../api/axios";

export default function KonyvKereses() {
  //const { adat } = useApiContext();
  /*const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({
        //genre: "",
        //publisher: "",
        author: "",
        //sort_by: "release_date",
    });

    useEffect(() => {
        searchBooks();
    }, [filters]);

    //meg nem a csak elerheto konyvek, majd kell hozza api vp !!!!
      const searchBooks = async () => {
        await csrf();
        try {
          const { data } = await myAxios.get("/api/book-offers", { params: filters });
            setBooks(data);
        } catch (error) {
            console.error("Hiba a könyvek lekérdezésekor", error);
        }
    }
  }*/
  return (
    <div>
      <h1>Könyvek keresése:</h1>
      <label>Szerző:</label>
        {/*<input type="text" onChange={(e) => setFilters({ ...filters, author: e.target.value })} />*/}
    </div>
  )
}