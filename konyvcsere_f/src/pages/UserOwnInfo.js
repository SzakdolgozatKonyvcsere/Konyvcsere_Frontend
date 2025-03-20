import React from 'react'
import UserOwnProfileInfo from '../components/UserOwnProfileInfo'
import UserOwnBookOffers from '../components/UserOwnBookOffers'


function UserOwnInfo() {
  return (
    <div className='user-page'>
      <UserOwnProfileInfo />
      <div className='book-offers-area'>
        <UserOwnBookOffers />
      </div>
    </div>
  )
}

export default UserOwnInfo