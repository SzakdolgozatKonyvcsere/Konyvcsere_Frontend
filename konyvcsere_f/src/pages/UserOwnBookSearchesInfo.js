import React from 'react'
import UserOwnBookDemands from '../components/UserOwnStuff/UserOwnBookDemands'
import { Button } from 'react-bootstrap'
import UserAddNewBookSearchButton from '../components/UserOwnStuff/UserAddNewBookSearchButton'

function UserOwnBookSearchesInfo() {
  return (
    <section className='user-books'>
      <div className='book-demands-head'>
        <h1 style={{marginTop: 0}}>Mentett keresések</h1>
        <UserAddNewBookSearchButton />
      </div>
      <div className='book-demands-area'>
        <UserOwnBookDemands />
      </div> 
    </section>
  )
}

export default UserOwnBookSearchesInfo