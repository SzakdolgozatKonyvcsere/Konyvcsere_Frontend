import React from 'react'
import { AllUserContext } from '../contexts/AllUsersContext'
import {useContext} from 'react'
import UserSorAdmin from './UserSorAdmin';

export default function UserTablazatAdmin() {
    const {userLista}=useContext(AllUserContext);
    
  return (
    <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <table className="table">
        <thead>
            <tr>
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