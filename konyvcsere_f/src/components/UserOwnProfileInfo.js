import React from 'react'
import useAuthContext from '../contexts/AuthContext'

function UserOwnProfileInfo() {
  const {user} = useAuthContext();

  return (
    <div className='user-own-profile'>
      <div className='user-own-profile--details'>
        <div className='user-own-profile--details-left'>
          <p className='user-own-profile--details-left_text'>Felhasználónév: {user.name}</p>
          <p className='user-own-profile--details-left_text'>Teljes név: {user.full_name}</p>
          <p className='user-own-profile--details-left_text'>E-mail: {user.email}</p>
          <p className='user-own-profile--details-left_text'>Város: {user.city}</p>
          <p className='user-own-profile--details-left_text'>Telefonszám: {user.tel}</p>
        </div>
        <div className='user-own-profile--details-right'>
          <img className='user-own-profile--details-right_image' src={user.img_url}></img>
        </div>
      </div>
    </div>
  )
}

export default UserOwnProfileInfo