import React, { useState } from 'react'
import UserOwnBookOffers from '../components/UserOwnStuff/UserOwnBookOffers'
import UserOwnBookDemands from '../components/UserOwnStuff/UserOwnBookDemands'

function UserOwnBooksInfo() {
  const [showDemands, setShowDemands] = useState(true);

  const handleShowDemands = () => {
    setShowDemands(!showDemands);
  }

  return (
    <section className='user-books'>
      <div className='trigger-area'>
        <h3 className="books-trigger btn-primary" onClick={showDemands?null:handleShowDemands}>Kínált könyvek</h3>
        <h3 className="books-trigger btn-primary" onClick={showDemands?handleShowDemands:null}>Mentett keresések</h3>
      </div>
      {showDemands && (
        <div className='book-offers-area'>
          <UserOwnBookOffers />
        </div>
      )}
      {!showDemands && (
        <div className='book-demands-area'>
          <UserOwnBookDemands />
        </div>
      )}
      
    </section>
  )
}

export default UserOwnBooksInfo