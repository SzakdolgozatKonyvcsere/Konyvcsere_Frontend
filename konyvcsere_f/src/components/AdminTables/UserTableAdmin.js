import React from 'react'
import TableAdminCreate from './TableAdminCreate'

//const TableAdminCreate = React.lazy(() => import('./TableAdminCreate'));


export default function UserTableAdmin({users}) { // destructuring, this saves a line of const users = props.users
  

  const excludedKeys = ['remember_token', 'email_verified_at'];
  const filteredUsers = users.map(user => {
    const entries = Object.entries(user).filter(([key]) => !excludedKeys.includes(key));

    // Role nélk. object'
    const withoutRole = Object.fromEntries(entries.filter(([key]) => key !== 'role'));

    // végére tesszük a role-t
    return {
      ...withoutRole,
      ...(user.role !== undefined && { role: user.role })
    };
  });

  

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
            online_status:"Státusz:",
            img_url:"Kép:",
            created_at:"Létrehozás dátuma:",
            updated_at:"Utolsó módosítás:",
            role:"Szerep:"
          }
        }
        tBodyContent={filteredUsers}
        removeFn={(row) => console.log("Removing:", row)}
      />
    </>
  )
}
