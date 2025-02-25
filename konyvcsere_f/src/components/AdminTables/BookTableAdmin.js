import React from 'react';
import TableAdminCreate from './TableAdminCreate.js';

export default function BookTableAdmin({books}){
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