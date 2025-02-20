import React from 'react'
import { AllUserContext } from '../../contexts/AllUsersContext'
import {useContext} from 'react'
import UserSorAdmin from './UserSorAdmin';
import { ApiContext } from '../../contexts/ApiContext';

export default function UserTablazatAdmin() {
  const {userLista}=useContext(ApiContext);
    
  return (
    <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <table className="table table_admin">
        <thead>
            <tr className='table_admin-row_head'>
                <th scope="col">
                    ID: 
                </th>
                <th scope="col">
                    Név: 
                </th>
                <th scope="col">
                    Email: 
                </th>
                <th scope="col">
                    Teljes név: 
                </th>
                <th scope="col">
                    Város: 
                </th>
                <th scope="col">
                    Telefonszám: 
                </th>
                <th scope="col">
                    Szerep:
                </th>
                <th scope="col">
                    Státusz:
                </th>
                <th scope="col">
                    Kép:
                </th>
                <th scope="col">
                    Token:
                </th>
                <th scope="col">
                    Készült:
                </th>
                <th scope="col">
                    Utolsó módosítás dátuma:
                </th>
                <th scope="col">
                    Módosítás
                </th>
                <th scope="col">
                    Törlés:
                </th>
            </tr>
        </thead>
        <tbody>
            {userLista.map((user)=>{
                return <UserSorAdmin user={user} key={user.id} />
            })}
        </tbody>
      </table>
    </div>
  )
}