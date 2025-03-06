import React from 'react'
import TableAdminCreate from './TableAdminCreate'
//const TableAdminCreate = React.lazy(() => import('./TableAdminCreate'));


export default function UserTableAdmin({users}) { // destructuring, this saves a line of const users = props.users
  const excludedKeys = ['remember_token', 'email_verified_at'];
  const filteredUsers = users.map(user =>
    Object.fromEntries(
      Object.entries(user).filter(([key]) => !excludedKeys.includes(key))
    )
  );
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
            created_at:"Létrehozás dátuma:",
            updated_at:"Utolsó módosítás:"
          }
        }
        tBodyContent={filteredUsers}
        editFn={(row) => console.log("Editing:", row)}
        removeFn={(row) => console.log("Removing:", row)}
      />
    </>
  )
}
