import React, { useEffect } from 'react'
import useApiContext from '../contexts/ApiContext'
import useAuthContext from '../contexts/AuthContext';
import Loader from './Loader';

function UserOwnBookOffers() {
  const {userBookOffersInfo, getUserBookOffersInfo, setBookOffersInfo} = useApiContext();
  const {user} = useAuthContext();

  useEffect(() => {
    getUserBookOffersInfo(`/api/user-book-offer-info/${user.id}`, setBookOffersInfo);
  }, []);
    

  return (
    <>
      {userBookOffersInfo.map((book, index) => (
        <div key={index} className='user-book-offers'>
          <div className='user-book-offers__details-left'>
            <img className='user-book-offers__details-left__image' src={'/basic_book.png'}></img>
          </div>
          <div className='user-book-offers__details-right'>
            <p className='user-book-offers__details-right__text'>cím: <span className='--value'>{book.title}</span></p>
            <p className='user-book-offers__details-right__text'>kiadó: <span className='--value'>{book.publisher_name}</span></p>
            <p className='user-book-offers__details-right__text'>műfaj: <span className='--value'>{book.genre_name}</span></p>
            <p className='user-book-offers__details-right__text'>nyelv: <span className='--value'>{book.language}</span></p>
            <p className='user-book-offers__details-right__text'>kiadás éve: <span className='--value'>{book.publication_year}</span></p>
            <p className='user-book-offers__details-right__text'>minőség: <span className='--value'>{book.quality}</span></p>
            <p className='user-book-offers__details-right__text'>állapot: <span className='--value'>{book.book_status}</span></p>
          </div> 
        </div>
      ))}
    </>
  )
}

export default UserOwnBookOffers