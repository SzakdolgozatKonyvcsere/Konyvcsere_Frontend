import React from 'react'
import UserOwnBookDemands from '../components/UserOwnStuff/UserOwnBookDemands'

function UserOwnBookSearchesInfo() {
  return (
    <section className='user-books'>
      <h1>Mentett keresések</h1>
      <div className='book-demands-area'>
        <UserOwnBookDemands />
      </div> 
    </section>
  )
}

export default UserOwnBookSearchesInfo