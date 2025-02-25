import React from 'react';
import TableAdminCreate from './TableAdminCreate.js';

export default function BookTableAdmin({books}){
    return (
        <>
            <TableAdminCreate
                tHeadLabels={[
                    "Id",
                    "User",
                    "Kiadó",
                    "Cím",
                    "Mű",
                    "Nyelv",
                    "Kiadási év",
                    "Könyv állapota",
                    "Készült",
                    "Utolsó módosítás dátuma"
                ]}        
                tBodyContent={books}
                edit={(row) => console.log("Editing", row)}
                remove={(row) => console.log("Removing", row)}
            />
        </>
    )
}