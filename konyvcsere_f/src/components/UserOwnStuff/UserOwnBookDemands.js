import React, { useEffect } from 'react'
import useAuthContext from '../../contexts/AuthContext';
import useApiContext from '../../contexts/ApiContext';

function UserOwnBookDemands() {
  const {userBookDemandsInfo, getUserBookDemandsInfo, setBookDemandsInfo} = useApiContext();
  const {user} = useAuthContext();

  useEffect(() => {
    getUserBookDemandsInfo(user.id, setBookDemandsInfo);
  }, []);

  const headLabels = [
    "cím",
    "kiadó",
    "műfaj",
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
            </tr>
          </thead>
          <tbody className='user-book-demands__table-body'>
            {userBookDemandsInfo.map((book, index) => (
                <tr key={index} className='user-book-demands__table-body_element'>
                  {Object.values(book).map((col, colInd) => (
                      <td key={colInd}>{col}</td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserOwnBookDemands