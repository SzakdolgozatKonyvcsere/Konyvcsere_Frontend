import React, { useEffect } from 'react'
import useAuthContext from '../contexts/AuthContext';
import useApiContext from '../contexts/ApiContext';

function UserOwnBookDemands() {
  const {userBookDemandsInfo, getUserBookDemandsInfo, setBookDemandsInfo} = useApiContext();
  const {user} = useAuthContext();

  useEffect(() => {
    getUserBookDemandsInfo(user.id, setBookDemandsInfo);
  }, []);
  return (
    <>
      {userBookDemandsInfo.map((book, index) => {
        return (
          <div key={index} className='user-book-demands'>
            <div className='user-book-demands__details'>
              <div className='user-book-demands__details__text'><span className='--value'>cím: {book.title}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>kiadó: {book.publisher_name}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>műfaj: {book.genre_name}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>nyelv: {book.language}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>min év: {book.min_publication_year}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>max év: {book.max_publication_year}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>státusz: {book.demand_status}</span></div>
              <div className='user-book-demands__details__text'><span className='--value'>módosítva: {book.updated_at}</span></div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default UserOwnBookDemands