import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import useAuthContext from "../../contexts/AuthContext";
import UserOwnExchangesModalOtherProfile from "./UserOwnExchangesModalOtherProfile";
import UserOwnExchangesModalBook from "./UserOwnExchangesModalBook";
import { FaArrowRightLong, FaArrowLeftLong, FaArrowRightArrowLeft } from "react-icons/fa6";


export default function UserOwnExchangesCard3(props) {

    const { getUserById, getBookByIdForExchange } = useApiContext();
        const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
        const [interestedUser, setInterestedUser] = useState(null);
        const [desiredBook, setDesiredBook] = useState(null);
        const [offeredBook, setOfferedBook] = useState(null);
        const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
        const [user, setUser] = useState("");
        const [clicked, setClicked] = useState(false);
        // Ha az interested_user nem egyezik az authUser-rel
        const isInterestedUser = interestedUser && interestedUser.id === authUser.id;
        //modalok:
        const [modalShowB, setModalShowB] = useState(false);
        const [selectedBook, setSelectedBook] = useState(null);
        const [modalShowU, setModalShowU] = useState(false);
        const [selectedUser, setSelectedUser] = useState(null);
    
        const handleShowModalB = (book) => {
            if (book){
              setSelectedBook(book);
              setModalShowB(true);
            }
        };
        const handleShowModalU = (user) => {
          if (user){
            setSelectedUser(user);
            setModalShowU(true);
          }
      };

 
    // bejelentkezett felhasználó id
    useEffect(() => {
        if (authUser) {
            setUser(authUser.id);
        }
    }, [authUser]);

    // csere adatai
    useEffect(() => {
        async function fetchData() {
            if (!props.exchange?.desired_book_id) return;
            try {
                const userInterestedData = await getUserById(props.exchange.interested_user_id);
                const bookDesiredData = await getBookByIdForExchange(props.exchange.desired_book_id);
                const userDesiredBookOwnerData = await getUserById(props.exchange.desired_book_owner_id);
                //const bookOfferedData = await getBookByIdForExchange(props.exchange.offered_book_id);
                const bookOfferedData = props.exchange.offered_book_id
                ? await getBookByIdForExchange(props.exchange.offered_book_id)
                : null;
      

                setInterestedUser(userInterestedData || null);
                setDesiredBook(bookDesiredData || null);
                setDesiredBookOwnerUser(userDesiredBookOwnerData || null);
                setOfferedBook(bookOfferedData || null);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
        }
        fetchData();
    }, [props.exchange]);

  // dátumellenőrzés
  const dateToUse = new Date(props.exchange.updated_at || props.exchange.created_at);
  //const updatedDate = new Date(props.updated_at);
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);
  if (isNaN(dateToUse)) {
    console.warn("Nincs érvényes dátum az exchange objektumban!");
    return null;
  }
  /*
  console.log("datum: ", props.exchange.updated_at);*/

  if (dateToUse < oneMonthAgo) return null;

  return (
    <div className="exchangesStage3">
      <div className="card 3">
        <div className="card-header">
        {props.exchange.exchange_status === "a"
          ? "Sikeres csere! A részleteket e-mailben is megkaptad."
          : props.exchange.exchange_status === "v"
          ? "A csere nem jött létre. Lejárt vagy elutasították."
          : null}
        </div>
        <div className="card-body">
        {props.exchange.exchange_status === "a" && (
          <>
          <div className="sectionLeft">
            <div className="feltoltoUser" onClick={() => handleShowModalU(interestedUser)}>
            <img src={interestedUser?.img_url ? interestedUser.img_url.startsWith("http") ? interestedUser.img_url : `http://localhost:8000/${interestedUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
            className="user--profile-picture" />
              <span className="userProfileName">{interestedUser?.full_name}</span>
            </div>
            <div className="wantedBook2" onClick={() => handleShowModalB(offeredBook)}>
              <img
                className="exchange-books__image exchangecardimg"
                src={offeredBook?.img_url ? `http://localhost:8000/${offeredBook.img_url}` : "/basic_book.png"}
              />
              <span className="exchange-books__title">{offeredBook?.title}</span>
            </div>
          </div>
          <div className="arrow">
            <FaArrowRightArrowLeft />
          </div>
          <div className="sectionRight">
            <div className="feltoltoUser" onClick={() => handleShowModalU(desiredBookOwnerUser)}>
            <img src={desiredBookOwnerUser?.img_url ? desiredBookOwnerUser.img_url.startsWith("http") ? desiredBookOwnerUser.img_url : `http://localhost:8000/${desiredBookOwnerUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
            className="user--profile-picture" />
              <span className="userProfileName">{desiredBookOwnerUser?.full_name}</span>
            </div>
            <div className="wantedBook2" onClick={() => handleShowModalB(desiredBook)}>
              <img
                className="exchange-books__image exchangecardimg"
                src={desiredBook?.img_url ? `http://localhost:8000/${desiredBook.img_url}` : "/basic_book.png"}
              />
              <span className="exchange-books__title">{desiredBook?.title}</span>
            </div>
          </div>
          </>
        )}

        {props.exchange.exchange_status === "v" && (
          <>
          <div className="sectionLeft">
            <div className="feltoltoUser" onClick={() => handleShowModalU(interestedUser)}>
            <img src={interestedUser?.img_url ? interestedUser.img_url.startsWith("http") ? interestedUser.img_url : `http://localhost:8000/${interestedUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
            className="user--profile-picture" />
              <span className="userProfileName">{interestedUser?.full_name}</span>
            </div>
            <div className="wantedBook2" onClick={() => handleShowModalB(offeredBook)}>
              <img
                className="exchange-books__image exchangecardimg"
                src={offeredBook?.img_url ? `http://localhost:8000/${offeredBook.img_url}` : "/basic_book.png"}
              />
              <span className="exchange-books__title">{offeredBook?.title}</span>
            </div>
          </div>
          <div className="arrow">
            <FaArrowRightArrowLeft />
          </div>
          <div className="sectionRight">
            <div className="feltoltoUser" onClick={() => handleShowModalU(desiredBookOwnerUser)}>
            <img src={desiredBookOwnerUser?.img_url ? desiredBookOwnerUser.img_url.startsWith("http") ? desiredBookOwnerUser.img_url : `http://localhost:8000/${desiredBookOwnerUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
            className="user--profile-picture" />
              <span className="userProfileName">{desiredBookOwnerUser?.full_name}</span>
            </div>
            <div className="wantedBook2" onClick={() => handleShowModalB(desiredBook)}>
              <img
                className="exchange-books__image exchangecardimg"
                src={desiredBook?.img_url ? `http://localhost:8000/${desiredBook.img_url}` : "/basic_book.png"}
              />
              <span className="exchange-books__title">{desiredBook?.title}</span>
            </div>
          </div>
          </>
        )}

        </div>
        <div className="card-footer">
          <small>Csere lezárva: {dateToUse.toLocaleDateString()}</small>
        </div>

        {/* Modálok */}
        <UserOwnExchangesModalOtherProfile show={modalShowU} onHide={() => setModalShowU(false)} userO={selectedUser} />
        <UserOwnExchangesModalBook show={modalShowB} onHide={() => setModalShowB(false)} book={selectedBook} />
      </div>
    </div>
  );
}
