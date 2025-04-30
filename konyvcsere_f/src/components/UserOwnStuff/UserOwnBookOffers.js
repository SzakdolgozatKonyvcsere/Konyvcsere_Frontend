import React, { useEffect, useState } from 'react'
import useApiContext from '../../contexts/ApiContext'
import useAuthContext from '../../contexts/AuthContext';
import Loader from '../Loader';
import { formatDistanceToNow } from "date-fns";
import { hu } from "date-fns/locale";
import ModalEditBookOffer from './modals/ModalEditBookOffer';
import ModalDeleteBookOffer from './modals/ModalDeleteBookOffer';

function UserOwnBookOffers() {
  const { userBookOffersInfo, getUserBookOffersInfo, setBookOffersInfo } = useApiContext();
  const { user } = useAuthContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleShowEditModal = (book) => {
    setEditModalVisible(!editModalVisible);
    setSelectedBook(book);
  };

  const handleShowDeleteModal = (book) => {
    setDeleteModalVisible(!deleteModalVisible);
    setSelectedBook(book);
  }

  useEffect(() => {
    if (user) getUserBookOffersInfo(user.id, setBookOffersInfo);
  }, [user]);
  
  /*useEffect(() => {
    getUserBookOffersInfo(user.id, setBookOffersInfo);
  }, [user]);
  */

  return (
    <>
      {userBookOffersInfo
        .filter((bookDetail) => bookDetail.book_status !== 'x')
        .map((bookDetail, index) => (
        <div key={index} className="card all-available-books" style={{ width: "18rem" }}>
          <img className='all-available-books__image'
            src={bookDetail?.img_url ? `http://localhost:8000/${bookDetail?.img_url}`
              : '/basic_book.png'}
            onError={(e) => {
              e.target.onerror = null; // Végtelen ciklus elkerülése érdekében
              e.target.src = '/basic_book.png'
            }}></img>
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
            <button className="btn btn-primary all-available-books__button" variant="primary" onClick={() => handleShowDeleteModal(bookDetail)}>törlés</button>
          </div>
        </div>
      ))}
      {editModalVisible && <ModalEditBookOffer
        show={editModalVisible}
        handleClose={handleShowEditModal}
        book={selectedBook}
        onUpdated={() => getUserBookOffersInfo(user.id, setBookOffersInfo)}
      />} 
      {deleteModalVisible && <ModalDeleteBookOffer
        show={deleteModalVisible}
        handleClose={handleShowDeleteModal}
        book={selectedBook}
        onUpdated = {() => getUserBookOffersInfo(user.id, setBookOffersInfo)}
      />}
    </>
  );
}

export default UserOwnBookOffers;