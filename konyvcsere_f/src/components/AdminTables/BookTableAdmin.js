import React, { useEffect } from 'react';
import TableAdminCreate from './TableAdminCreate.js';
import useApiContext from '../../contexts/ApiContext.js';

export default function BookTableAdmin({books}){
    const {getBooks, setBookLista, bookLista} = useApiContext();
  
    useEffect (()=>{
        console.log("Fetching books..."); //logolás
        getBooks("/api/book-offers", setBookLista)
      }, []);

      useEffect(() => {
        console.log("bookLista state:", bookLista); // ellenőrizzük a frissítést
      }, [bookLista]);
    
      //ha üres vagy null
      if (!bookLista || !bookLista.length) {
        return <p>Betöltés...</p>;
      }
    
    return (
            <TableAdminCreate
                tHeadLabels={
                    {
                        name:"Név:",
                        publisher_name:"Kiadó:",
                        title:"Cím:",
                        language:"Nyelv:",
                        publication_year:"Kiadás éve:",
                        quality:"Minőség:",
                        book_status:"Könyv állapot:",
                        created_at:"Létrehozás dátuma:",
                        updated_at:"Utolsó módosítás:"
                    }
                }        
                tBodyContent={books}
                editFn={(row) => console.log("Editing", row)}
                removeFn={(row) => console.log("Removing", row)}
            />
    );
}