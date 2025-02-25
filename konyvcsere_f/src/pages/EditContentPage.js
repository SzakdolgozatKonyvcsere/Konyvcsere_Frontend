import React from 'react'
import UsersTableAdminPage from './UsersTableAdminPage'
import { Link } from 'react-router'

function EditContentPage() {
  return (
    <>
      <div className='content-edit'>
        <div className='content-edit--selection'>
          <Link className="content-edit--selection__item" to="/osszesuser">
            Felhasználók
          </Link>
          <Link className="content-edit--selection__item" to="/osszeskonyv">
            Könyvek
          </Link>
        </div>
      </div>
    </>
  )
}

export default EditContentPage