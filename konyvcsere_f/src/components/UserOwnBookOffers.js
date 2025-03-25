import React, { useEffect } from 'react'
import useApiContext from '../contexts/ApiContext'
import useAuthContext from '../contexts/AuthContext';
import Loader from './Loader';
import { formatDistanceToNow } from "date-fns";
import { hu } from "date-fns/locale";

function UserOwnBookOffers() {
  const { userBookOffersInfo, getUserBookOffersInfo, setBookOffersInfo } = useApiContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getUserBookOffersInfo(user.id, setBookOffersInfo);
  }, [user.id]);

  return (
    <>
      {userBookOffersInfo.map((book, index) => (
        <div key={index} className='user-book-offers'>
          <div className='user-book-offers__details-left'>
            <img
              className='user-book-offers__details-left__image'
              src={book.img_url ? book.img_url : '/basic_book.png'}
              alt={book.title}
            />
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
            <p className='user-book-offers__details-right__text'>feltöltve: <span className='--value'>{
              formatDistanceToNow(new Date(book.updated_at), { addSuffix: true, locale: hu })}
              </span>
              </p>
          </div> 
        ))}
         </>
      );
    }

export default UserOwnBookOffers;