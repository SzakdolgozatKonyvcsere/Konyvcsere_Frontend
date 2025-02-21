import React from 'react'
import TableAdminCreate from './TableAdminCreate'
//const TableAdminCreate = React.lazy(() => import('./TableAdminCreate'));


export default function UserTableAdmin({users}) { // destructuring, this saves a line of const users = props.users
  return (
    <>
      <TableAdminCreate
        tHeadLabels={[
          "ID:",
          "Név:",
          "Email:",
          "Teljes név:",
          "Város:",
          "Telefonszám:",
          "Szerep:",
          "Státusz:",
          "Kép:",
          "Token:",
          "Készült:",
          "Utolsó módosítás dátuma:",
          "Módosítás",
          "Törlés:"
        ]}
        tBodyContent={users}
        editFn={(row) => console.log("Editing:", row)}
        removeFn={(row) => console.log("Removing:", row)}
      />
    </>
  )
}
