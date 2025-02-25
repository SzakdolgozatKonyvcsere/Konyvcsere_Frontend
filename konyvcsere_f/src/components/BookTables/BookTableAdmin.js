import React from 'react';
import TableBookCreate from './TableBookCreate';

export default function BookTableAdmin({books}){
    return (
        <>
        <TableBookCreate
            bHeadLabels={[
                "Cím",
                "Kiadó",
                "Mű",
                "Nyelv",
                "Kiadási év",
                "Könyv állapota",
                "Módosítás",
                "Törlés"
            ]}        
            bBodyContent={books}
            edit={(row) => console.log("Editing", row)}
            remove={(row) => console.log("Removing", row)}
            />
        </>
    )
}