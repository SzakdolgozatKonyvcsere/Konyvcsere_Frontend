import React from 'react'
import TableAdminCreate from './TableAdminCreate'
//const TableAdminCreate = React.lazy(() => import('./TableAdminCreate'));


export default function UserTableAdmin({users}) { // destructuring, this saves a line of const users = props.users
  return (
    <>
      <TableAdminCreate
        tHeadLabels={
          {
            id:"ID:",
            name:"Név:",
            email:"Email:",
            full_name:"Teljes név:",
            city:"Város:",
            tel:"Telefonszám:",
            role:"Szerep:",
            online_status:"Státusz:",
            img_url:"Kép:",
            remember_token:"Token:",
            created_at:"Létrehozás dátuma:",
            updated_at:"Utolsó módosítás:"
          }
        }
        tBodyContent={users}
        editFn={(row) => console.log("Editing:", row)}
        removeFn={(row) => console.log("Removing:", row)}
      />
    </>
  )
}
