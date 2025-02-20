import React from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../contexts/AuthContext'
import AllUsersContext from '../contexts/AllUsersContext'

export default function UserSorAdmin(props){

    return(
        <>
          <tr className='table_admin-row'>
            <td scope="col">
                {props.user.id}
            </td>
            <td scope="col">
                {props.user.name}
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
            <td scope="col">
                {props.user.role}
            </td>
            <td scope="col">
                {props.user.online_status}
            </td>
            <td scope="col" className='table_admin-row--longText'>
                {props.user.img_url}
            </td>
            <td scope="col" className='table_admin-row--longText'>
                {props.user.remember_token}
            </td>
            <td scope="col" className='table_admin-row--longText'>
                {props.user.created_at}
            </td>
            <td scope="col" className='table_admin-row--longText'>
                {props.user.updated_at}
            </td>
            <td  className='table_admin-row--button'>
                <button onClick={""}>✎</button>
            </td>
            <td  className='table_admin-row--button'>
                <button onClick={""}>🗑️</button>
            </td>            
          </tr>
        </>
    )
}