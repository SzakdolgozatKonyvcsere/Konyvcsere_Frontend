import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../contexts/AuthContext'
import AllUsersContext from '../contexts/AllUsersContext'

export default function UserSorAdmin(props){

    return(
        <>
      <tr>
        <td scope="col">
            {props.user.nev}
        </td>
        <td scope="col">
            {props.user.email}
        </td>
        <td scope="col">
            {props.user.full_name}
        </td>
        <td scope="col">
            {props.user.city}
        </td>
        <td scope="col">
            {props.user.tel}
        </td>
        
      </tr>
    </>
    )
}