import React from 'react'
import useAuthContext from '../contexts/AuthContext'

function UserOwnProfileInfo() {
  const {user} = useAuthContext();

  return (
    <div className='user-own-profile'>
      <div className='user-own-profile__details'>
        <div className='user-own-profile__details-top'>
          <img className='user-own-profile__details-top__image' src={user.img_url}></img>
        </div>
        <div className='user-own-profile__details-bottom'>
          <p className='user-own-profile__details-bottom__text'>Felhasználónév: <span className='--value'>{user.name}</span></p>
          <p className='user-own-profile__details-bottom__text'>Teljes név: <span className='--value'>{user.full_name}</span></p>
          <p className='user-own-profile__details-bottom__text'>E-mail: <span className='--value'>{user.email}</span></p>
          <p className='user-own-profile__details-bottom__text'>Város: <span className='--value'>{user.city}</span></p>
          <p className='user-own-profile__details-bottom__text'>Telefonszám: <span className='--value'>{user.tel}</span></p>
        </div>   
      </div>
    </div>
  )
}

export default UserOwnProfileInfo