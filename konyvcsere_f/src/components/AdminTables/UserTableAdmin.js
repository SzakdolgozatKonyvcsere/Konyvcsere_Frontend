import React, { useEffect } from 'react'
import TableAdminCreate from './TableAdminCreate'
import useApiContext from '../../contexts/ApiContext';
//const TableAdminCreate = React.lazy(() => import('./TableAdminCreate'));


export default function UserTableAdmin({users}) { // destructuring, this saves a line of const users = props.users
  const {getUsers, setUserLista, userLista} = useApiContext();
  useEffect (()=>{
    console.log("Fetching users..."); //logolás
    getUsers("/api/users", setUserLista)
  }, []);

  useEffect(() => {
    console.log("userLista state:", userLista); // ellenőrizzük a betöltött adatokat
  }, [userLista]); // állapotváltozást követjük

  const excludedKeys = ['remember_token', 'email_verified_at'];
  const filteredUsers = users.map(user =>
    Object.fromEntries(
      Object.entries(user).filter(([key]) => !excludedKeys.includes(key))
    )
  );
  console.log("Filtered Users:", filteredUsers);

  if (!userLista?.length) {
    return <p>Betöltés...</p>;
  }

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
