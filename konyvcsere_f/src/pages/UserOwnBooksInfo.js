import React from 'react'
import UserOwnBookOffers from '../components/UserOwnBookOffers'
import UserOwnBookDemands from '../components/UserOwnBookDemands'

function UserOwnBooksInfo() {
  return (
    <>
      <div className='book-offers-area'>
        <h2>Kínált könyvek:</h2>
        {/*<UserOwnBookOffers />*/}
      </div>
      <div className='book-demands-area'>
        <h2>Mentett keresések:</h2>
        <UserOwnBookDemands />
      </div>
    </>
  )
}

export default UserOwnBooksInfo