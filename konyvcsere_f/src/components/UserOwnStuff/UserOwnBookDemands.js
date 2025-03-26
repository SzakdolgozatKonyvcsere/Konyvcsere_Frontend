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
          <thead>
            <tr>
              {headLabels.map((item, key) => {
                <th key={key}>{item}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {userBookDemandsInfo.map((book, index) => (
                <tr key={index}>
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