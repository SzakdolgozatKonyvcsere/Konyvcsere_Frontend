import React, { useState } from 'react'
import useAuthContext from '../contexts/AuthContext'
import UserProfilePictureUpdateForm from './UserProfilePictureUpdateForm';
import { useNavigate } from 'react-router-dom';

function UserOwnProfileInfo() {
  const {user} = useAuthContext();
  const [isPFPUpdateVisible, setPFPUpdateVisible] = useState(false);

  const togglePFPUpdateVisibility = () => {
    setPFPUpdateVisible(!isPFPUpdateVisible);
  };

  return (
    <div className='user-own-profile'>
      <div className='user-own-profile__details'>
        <div className='user-own-profile__details-top'>
          <div className="user-own-profile__details-top__edit-image" onClick={togglePFPUpdateVisibility}>
            <img className='user-own-profile__details-top__image' src={`http://localhost:8000/${user.img_url}`}></img>
            <span>szerkesztés</span>
          </div>
        </div>
        <div className='user-own-profile__details-bottom'>
          <p className='user-own-profile__details-bottom__text'>Felhasználónév: <span className='--value'>{user.name}</span></p>
          <p className='user-own-profile__details-bottom__text'>Teljes név: <span className='--value'>{user.full_name}</span></p>
          <p className='user-own-profile__details-bottom__text'>E-mail: <span className='--value'>{user.email}</span></p>
          <p className='user-own-profile__details-bottom__text'>Város: <span className='--value'>{user.city}</span></p>
          <p className='user-own-profile__details-bottom__text'>Telefonszám: <span className='--value'>{user.tel}</span></p>
        </div>   
      </div>
      {isPFPUpdateVisible && (
        <>
          <div onClick={togglePFPUpdateVisibility} className='popup-form__background'>
            <UserProfilePictureUpdateForm/>
          </div>          
        </>        
      )}
      
    </div> 
  )
}

export default UserOwnProfileInfo