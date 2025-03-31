import React, { useEffect, useState } from 'react'
import useApiContext from '../../contexts/ApiContext'
import useAuthContext from '../../contexts/AuthContext';
import Loader from '../Loader';
import { formatDistanceToNow } from "date-fns";
import { hu } from "date-fns/locale";
import ModalEditBookOffer from './modals/ModalEditBookOffer';

function UserOwnBookOffers() {
  const { userBookOffersInfo, getUserBookOffersInfo, setBookOffersInfo } = useApiContext();
  const { user } = useAuthContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editSelectedBook, setEditSelectedBook] = useState(null);

  const handleShowEditModal = (book) => {
    setEditModalVisible(!editModalVisible);
    setEditSelectedBook(book);
  };

  useEffect(() => {
    getUserBookOffersInfo(user.id, setBookOffersInfo);
  }, [user.id]);
    

  return (
    <>
      {userBookOffersInfo.map((book, index) => (
        <div className="card all-available-books" style={{ width: "18rem" }}>
          <img className='all-available-books__image' src={userBookOffersInfo.img_url ? `http://localhost:8000/${userBookOffersInfo.img_url}` : '/basic_userBookOffersInfo.png'}></img>
          <div className="card-body all-available-books">
            <h5 className="card-title all-available-books" style={{border:"none", fontWeight: "bold", textAlign: "center"}}>{userBookOffersInfo.title || "Nincs cím"}</h5>
            <ul className="list-group list-group-flush all-available-books">
              <li className="list-group-item all-available-books" style={{ borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{userBookOffersInfo.authors ? `${userBookOffersInfo.authors}` : "ismeretlen szerző"}</small></li>
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{userBookOffersInfo.publisher_name ?  `${userBookOffersInfo.publisher_name}` : "ismeretlen kiadó"} Kiadó</small></li>
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{userBookOffersInfo.publication_year ? userBookOffersInfo.publication_year : "nincs dátum"}</small></li>
              {/*<li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{userBookOffersInfo.language ? `${userBookOffersInfo.language}` : "nincs nyelv"}</small></li>*/}
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{userBookOffersInfo.genre_name ? `${userBookOffersInfo.genre_name}` : "nincs műfaj"}</small></li>
            </ul>
            <button className="btn btn-primary all-available-books" variant="primary"  onClick={() => handleShowEditModal(book)}>Részletek</button>
          </div>
        </div>
             
        /*<div key={index} className='user-book-offers'>
          <div className='user-book-offers__details-left'>
            <img
              className='user-book-offers__details-left__image'
              src={book && userBookOffersInfo.img_url ? `http://localhost:8000/${userBookOffersInfo.img_url}` : '/basic_userBookOffersInfo.png'}
              alt={userBookOffersInfo.title}
            />
          </div>
          <div className='user-book-offers__details-right'>
            <p className='user-book-offers__details-right__text'>cím: <span className='--value'>{userBookOffersInfo.title}</span></p>
            <p className='user-book-offers__details-right__text'>kiadó: <span className='--value'>{userBookOffersInfo.publisher_name}</span></p>
            <p className='user-book-offers__details-right__text'>műfaj: <span className='--value'>{userBookOffersInfo.genre_name}</span></p>
            <p className='user-book-offers__details-right__text'>nyelv: <span className='--value'>{userBookOffersInfo.language}</span></p>
            <p className='user-book-offers__details-right__text'>kiadás éve: <span className='--value'>{userBookOffersInfo.publication_year}</span></p>
            <p className='user-book-offers__details-right__text'>minőség: <span className='--value'>{userBookOffersInfo.quality}</span></p>
            <p className='user-book-offers__details-right__text'>állapot: <span className='--value'>{userBookOffersInfo.book_status}</span></p>
          </div>
            <p className='user-book-offers__details-right__text'>feltöltve: <span className='--value'>{
              formatDistanceToNow(new Date(userBookOffersInfo.updated_at), { addSuffix: true, locale: hu })}
                    </span>
          </p>
        </div>*/
      ))}
      {editModalVisible && <ModalEditBookOffer
        show={editModalVisible}
        handleClose={handleShowEditModal}
        book={editSelectedBook}
      />} 
    </>
  );
}

export default UserOwnBookOffers;