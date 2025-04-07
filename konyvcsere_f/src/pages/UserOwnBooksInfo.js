import React, { useState } from 'react'
import UserOwnBookOffers from '../components/UserOwnStuff/UserOwnBookOffers'

function UserOwnBooksInfo() {
  return (
    <section className='user-books'>
      <h1>Kínált könyvek</h1>
      <div className='book-offers-area'>
        <UserOwnBookOffers />
      </div> 
    </section>
  )
}

export default UserOwnBooksInfo