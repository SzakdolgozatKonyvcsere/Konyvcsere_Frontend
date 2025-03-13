import React, { useEffect } from 'react';
import TableAdminCreate from './TableAdminCreate.js';
import useApiContext from '../../contexts/ApiContext.js';

export default function BookTableAdmin({books}){
    const {getBooks, setBookLista} = useApiContext();
  
    useEffect (()=>{
        getBooks("/api/book-offers", setBookLista)
      }, []);


    return (
        <>
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
                edit={(row) => console.log("Editing", row)}
                remove={(row) => console.log("Removing", row)}
            />
        </>
    )
}