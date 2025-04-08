import React, { useEffect, useState } from 'react'
import useAuthContext from '../../contexts/AuthContext';
import useApiContext from '../../contexts/ApiContext';
import ModalEditBookDemand from './modals/ModalEditBookDemand';
import ModalDeleteBookDemand from './modals/ModalDeleteBookDemand';

function UserOwnBookDemands() {
  const {userBookDemandsInfo, getUserBookDemandsInfo, setUserBookDemandsInfo, genreList, getGenreList} = useApiContext();
  const {user} = useAuthContext();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  //const [deleteSelectedBook, setDeleteSelectedBook] = useState(null);

  const handleShowEditModal = (book) => {
    setEditModalVisible(!editModalVisible);
    setSelectedBook(book);
  };

  const handleShowDeleteModal = (book) => {
    setDeleteModalVisible(!deleteModalVisible);
    setSelectedBook(book);
  }
  
  useEffect(() => {
    getUserBookDemandsInfo(user.id, setUserBookDemandsInfo);
  }, []);

  const headLabels = [
    "kiadó",
    "cím",
    "műfaj",
    "szerzők",
    "nyelv",
    "min év",
    "max év",
    "státusz",
    "módosítva"
  ];
  return (
    <>
      <div className='user-book-demands'>
        <table>
          <thead className='user-book-demands__table-head'>
            <tr>
              {headLabels.map((item, key) => (
                <th key={key} className='user-book-demands__table-head_element'>{item}</th>
              ))}
              <th className='user-book-demands__table-head_element'></th>
              <th className='user-book-demands__table-head_element'></th>
            </tr>
          </thead>
          <tbody className='user-book-demands__table-body'>
            {userBookDemandsInfo
              .filter((book) => book.demand_status !== 'x')
              .map((book, index) => (
                <tr key={index} className='user-book-demands__table-body_element'>
                {Object.entries(book)
                  .filter(([key]) => !["demand_id", "name", "created_at"].includes(key))
                  .map(([key, col], colInd) => (
                    <td key={colInd}>
                    {key === "demand_status" ? (
                      col === "e" ? "Elcserélt" :
                      col === "k" ? "Keres" :
                      col === "t" ? "Talált" :
                      "-"
                    ) : (
                      col ? col : "-"
                    )}
                    </td>
                  )
                )}
                  <td className='table_admin-row--button'>
                    <button onClick={() => handleShowEditModal(book)}>szerkesztés</button>
                  </td>
                  <td className='table_admin-row--button'>
                    <button onClick={() => handleShowDeleteModal(book)}>törlés</button>
                  </td> 
                </tr>
              )
            )}         
          </tbody>
        </table>
      </div>
      {editModalVisible && <ModalEditBookDemand
        show={editModalVisible}
        handleClose={handleShowEditModal}
        book={selectedBook}
        onUpdated={() => getUserBookDemandsInfo(user.id, setUserBookDemandsInfo)}
      />}
      {deleteModalVisible && <ModalDeleteBookDemand
        show={deleteModalVisible}
        handleClose={handleShowDeleteModal}
        book={selectedBook}
        onUpdated={() => getUserBookDemandsInfo(user.id, setUserBookDemandsInfo)}
      />}
    </>
  )
}

export default UserOwnBookDemands