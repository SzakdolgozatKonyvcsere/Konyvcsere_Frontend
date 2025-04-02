import React, { useEffect, useState } from 'react'
import useApiContext from '../../contexts/ApiContext'
import useAuthContext from '../../contexts/AuthContext';
import Loader from '../Loader';
import { formatDistanceToNow } from "date-fns";
import { hu } from "date-fns/locale";
import ModalEditBookOffer from './modals/ModalEditBookOffer';

function UserOwnBookOffers({ refresh = false, onRefreshed = () => {} }) {
  const { userBookOffersInfo, getUserBookOffersInfo, setBookOffersInfo } = useApiContext();
  const { user } = useAuthContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editSelectedBook, setEditSelectedBook] = useState(null);

  const handleShowEditModal = (book) => {
    setEditModalVisible(!editModalVisible);
    setEditSelectedBook(book);
  };

  useEffect(() => {
    if (refresh) {
      getUserBookOffersInfo(user.id, setBookOffersInfo);
      onRefreshed();
    }
  }, [refresh]);

  
  useEffect(() => {
    getUserBookOffersInfo(user.id, setBookOffersInfo);
  }, [user]);
    

  return (
    <>
      {userBookOffersInfo.map((bookDetail, index) => (
        <div key={index} className="card all-available-books" style={{ width: "18rem" }}>
          <img className='all-available-books__image' src={bookDetail?.img_url ? `http://localhost:8000/${bookDetail?.img_url}` : '/basic_bookDetail.png'}></img>
          <div className="card-body all-available-books">
            <h5 className="card-title all-available-books" style={{border:"none", fontWeight: "bold", textAlign: "center"}}>{bookDetail?.title || "Nincs cím"}</h5>
            <ul className="list-group list-group-flush all-available-books">
              <li className="list-group-item all-available-books" style={{ borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{bookDetail?.authors ? `${bookDetail?.authors}` : "ismeretlen szerző"}</small></li>
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{bookDetail?.publisher_name ?  `${bookDetail?.publisher_name}` : "ismeretlen kiadó"}</small></li>
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{bookDetail?.publication_year ? bookDetail?.publication_year : "nincs dátum"}</small></li>
              {/*<li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center"}}><small className="text-muted -adat" >{bookDetail.language ? `${bookDetail.language}` : "nincs nyelv"}</small></li>*/}
              <li className="list-group-item all-available-books" style={{ border:"none", borderRadius: "0", textAlign: "center" }}><small className="text-muted -adat" >{bookDetail?.genre_name ? `${bookDetail?.genre_name}` : "nincs műfaj"}</small></li>
            </ul>
            <button className="btn btn-primary all-available-books__button" variant="primary" onClick={() => handleShowEditModal(bookDetail)}>szerkesztés</button>
          </div>
        </div>
             
        /*<div key={index} className='user-book-offers'>
          <div className='user-book-offers__details-left'>
            <img
              className='user-book-offers__details-left__image'
              src={book && bookDetail.img_url ? `http://localhost:8000/${bookDetail.img_url}` : '/basic_bookDetail.png'}
              alt={bookDetail.title}
            />
          </div>
          <div className='user-book-offers__details-right'>
            <p className='user-book-offers__details-right__text'>cím: <span className='--value'>{bookDetail.title}</span></p>
            <p className='user-book-offers__details-right__text'>kiadó: <span className='--value'>{bookDetail.publisher_name}</span></p>
            <p className='user-book-offers__details-right__text'>műfaj: <span className='--value'>{bookDetail.genre_name}</span></p>
            <p className='user-book-offers__details-right__text'>nyelv: <span className='--value'>{bookDetail.language}</span></p>
            <p className='user-book-offers__details-right__text'>kiadás éve: <span className='--value'>{bookDetail.publication_year}</span></p>
            <p className='user-book-offers__details-right__text'>minőség: <span className='--value'>{bookDetail.quality}</span></p>
            <p className='user-book-offers__details-right__text'>állapot: <span className='--value'>{bookDetail.book_status}</span></p>
          </div>
            <p className='user-book-offers__details-right__text'>feltöltve: <span className='--value'>{
              formatDistanceToNow(new Date(bookDetail.updated_at), { addSuffix: true, locale: hu })}
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