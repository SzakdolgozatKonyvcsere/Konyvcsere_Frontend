import { useEffect } from "react";
import BookTableAdmin from "../components/AdminTables/BookTableAdmin";
import useApiContext from "../contexts/ApiContext";

export default function BooksTableAdminPage(){
    const {getBooks, bookLista} = useApiContext();
  
    useEffect (()=>{
        if(bookLista.length === 0) getBooks("/api/book-offers")
      }, []);
    return(
        <main>
            <h1>Táblázat Összes Könyv - Admin</h1>
            <div>
                <BookTableAdmin books={bookLista}/>
            </div>
        </main>
    )
}