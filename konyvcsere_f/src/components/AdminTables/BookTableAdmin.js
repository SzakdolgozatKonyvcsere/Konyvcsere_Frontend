import React, { useEffect } from 'react';
import TableAdminCreate from './TableAdminCreate.js';
import useApiContext from '../../contexts/ApiContext.js';

export default function BookTableAdmin({books}){
    const {getBooks, setBookLista, bookLista} = useApiContext();
  
    useEffect (()=>{
        getBooks("/api/book-offers")
      }, []);
    
    return (
            <TableAdminCreate
                tHeadLabels={
                  {
                    offer_id: "ID:",
                    name: "Felhasználó:",
                    img_url: "Kép URL:",
                    publisher_name: "Kiadó:",
                    title: "Cím:",
                    genre_name: "Műfaj:",
                    language: "Nyelv:",
                    publication_year: "Kiadás éve:",
                    quality: "Minőség:",
                    book_status: "Könyv állapot:",
                    created_at: "Létreh. dátuma:",
                    updated_at: "Utolsó mód. dátuma:",
                    authors: "Szerző(k):"
                  }
                }        
                tBodyContent={books}
                editFn={(row) => console.log("Editing", row)}
                removeFn={(row) => console.log("Removing", row)}
            />
    );
}