import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import useAuthContext from "../../contexts/AuthContext";
import { BiCheck } from "react-icons/bi";
import { FaArrowRightLong, FaArrowLeftLong, FaArrowRightArrowLeft } from "react-icons/fa6";
import UserOwnExchangesModalOtherProfile from "./UserOwnExchangesModalOtherProfile";
import UserOwnExchangesModalBook from "./UserOwnExchangesModalBook";

//1. varakozas: en kertem eloszor, valaszara, konyvere varok 
//2. beleegyezes: ha a korabbi valasza, konyve megjott, elfogadom/elutasitom - patch
//3. varakozas: o kerte eloszor, valasztottam konyvet es az o beleegyezesere varok
export default function UserOwnExchangesCard2(props) {

    const { getUserById, getBookByIdForExchange, patchAcceptExchange, patchFinalizeExchange } = useApiContext();
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [offeredBook, setOfferedBook] = useState(null);
    const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
    const [user, setUser] = useState("");
    const [clicked, setClicked] = useState(false);
    const { refreshExchanges } = props;
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
  const handleClickBook = () => {
    setClicked(!clicked);
    alert("Kattintottál a képre!");
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

    // utolso patch
    const handleFinalAccept = async () => {
      const exchangeId = props.exchange?.exchange_id;
        if (!exchangeId) {
            console.error("Nincs exchange ID, a kérés nem küldhető.");
            return;
        }
        try {
          const finalizedExchange = await patchFinalizeExchange(exchangeId);
              if (finalizedExchange) {
              // frissiti a teljes listát (a szülő komponensben)
              if (typeof refreshExchanges === 'function') {
                refreshExchanges(); 
              }
          }
      } catch (error) {
          console.error("Hiba a PATCH kérés során:", error);
      }

        /*const result = await patchAcceptExchange(props.exchange.exchange_id);
        if (result && typeof props.refreshExchanges === "function") {
          props.refreshExchanges();
        }*/
      };


    return(
        <div className="exchangesStage2">
        <div className="card 1">
          <div className="card-header">
            {isInterestedUser && offeredBook
              ? "Találat! Elfogadod a csere feltételeit?"
              : !isInterestedUser && offeredBook
              ? "Csere partnered beleegyezésére vársz..."
              : "Csere partnered válasza..."}
          </div>
  
          <div className="card-body">
            {/* Állapot 1 */}
            {isInterestedUser && !offeredBook && (
              <div className="waiting">
                <div className="sectionRight">
                <div className="feltoltoUser" onClick={() => handleShowModalU(desiredBookOwnerUser)}>
                    <img src={desiredBookOwnerUser?.img_url ? desiredBookOwnerUser.img_url.startsWith("http") ? desiredBookOwnerUser.img_url : `http://localhost:8000/${desiredBookOwnerUser.img_url}` : "user_basic_pfp.jpg"} 
                    className="user--profile-picture" />
                    <span className="userProfileName">{desiredBookOwnerUser?.full_name}</span>
                  </div>
                    <div className="wantedBook2" onClick={() => handleShowModalB(desiredBook)}>
                        <img
                        className="exchange-books__image exchangecardimg"
                        src={desiredBook?.img_url ? desiredBook.img_url.startsWith("http") ? desiredBook.img_url : `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                        />
                        <span className="exchange-books__title">{desiredBook?.title}</span>
                    </div>
                </div>
                <div className="arrow">
                  <FaArrowLeftLong />
                </div>
                <div className="sectionLeft"> 
                <div className="feltoltoUser"  > {/*onClick={() => handleShowModalU(authUser)} */}
                    <img src={authUser?.img_url ? authUser.img_url.startsWith("http") ? authUser.img_url : `http://localhost:8000/${authUser.img_url}` : "user_basic_pfp.jpg"}
                    className="user--profile-picture" />
                    <span className="userProfileName">{authUser?.full_name}</span>
                  </div>
                  
                </div>
              </div>
            )}
  
            {/* Állapot 2 */}
            {!isInterestedUser && offeredBook && (
              <div className="waiting">
                <div className="sectionLeft">
                  <div className="feltoltoUser" onClick={() => handleShowModalU(interestedUser)}>
                    <img src={interestedUser?.img_url ? interestedUser.img_url.startsWith("http") ? interestedUser.img_url : `http://localhost:8000/${interestedUser.img_url}` : "user_basic_pfp.jpg"} 
                    className="user--profile-picture" />
                    <span className="userProfileName">{interestedUser?.full_name}</span>
                  </div>
                  <div className="wantedBook2" onClick={() => handleShowModalB(offeredBook)}>
                    <img
                    className="exchange-books__image exchangecardimg"
                    src={offeredBook?.img_url ? offeredBook.img_url.startsWith("http") ? offeredBook.img_url : `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'} 
                    />
                    <span className="exchange-books__title">{offeredBook?.title}</span>
                  </div>
                </div>
                <div className="arrow">
                  <FaArrowRightArrowLeft />
                </div>
                <div className="sectionRight">
                  <div className="feltoltoUser" onClick={() => handleShowModalU(authUser)}>
                    <img src={authUser?.img_url ? authUser.img_url.startsWith("http") ? authUser.img_url : `http://localhost:8000/${authUser.img_url}` : "user_basic_pfp.jpg"} 
                    className="user--profile-picture" />
                    <span className="userProfileName">{authUser?.full_name}</span>
                  </div>
                  <div className="wantedBook2" onClick={() => handleShowModalB(desiredBook)}>
                    <img
                      className="exchange-books__image exchangecardimg"
                      src={desiredBook?.img_url ? desiredBook.img_url.startsWith("http") ? desiredBook.img_url : `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                    />
                    <span className="exchange-books__title">{desiredBook?.title}</span>
                  </div>
                </div>
              </div>
            )}
  
            {/* Állapot 3 */}
            {isInterestedUser && offeredBook && (
              <div className="answear">
                <div className="sectionLeft">
                  <div className="feltoltoUser" onClick={() => handleShowModalU(desiredBookOwnerUser)}>
                    <img src={desiredBookOwnerUser?.img_url ? desiredBookOwnerUser.img_url.startsWith("http") ? desiredBookOwnerUser.img_url : `http://localhost:8000/${desiredBookOwnerUser.img_url}` : "user_basic_pfp.jpg"} 
                    className="user--profile-picture" />
                    <span className="userProfileName">{desiredBookOwnerUser?.full_name}</span>
                  </div>
                  <div className="wantedBook2" onClick={() => handleShowModalB(offeredBook)}>
                    <img
                    className="exchange-books__image exchangecardimg"
                    src={offeredBook?.img_url ? offeredBook.img_url.startsWith("http") ? offeredBook.img_url : `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'} 
                    />
                    <span className="exchange-books__title">{offeredBook?.title}</span>
                  </div>
                </div>
                <div className="arrow">
                  <FaArrowRightArrowLeft />
                </div>
                <div className="sectionRight">
                  <div className="feltoltoUser"  > {/* onClick={() => handleShowModalU(authUser)} */}
                    <img src={authUser?.img_url ? authUser.img_url.startsWith("http") ? authUser.img_url : `http://localhost:8000/${authUser.img_url}` : "user_basic_pfp.jpg"} 
                    className="user--profile-picture" />
                    <span className="userProfileName">{authUser?.full_name}</span>
                  </div>
                  <div className="wantedBook2" onClick={() => handleShowModalB(desiredBook)}>
                    <img
                    className="exchange-books__image exchangecardimg"
                    src={desiredBook?.img_url ? desiredBook.img_url.startsWith("http") ? desiredBook.img_url : `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                    />
                    <span className="exchange-books__title">{desiredBook?.title}</span>
                  </div>
                </div>
              </div>
            )}
          </div> 
  
          <div className="card-footer">
            {isInterestedUser && offeredBook ? (
              <button className="btn btn-primary" onClick={handleFinalAccept}>
                Elfogadom <BiCheck />
              </button>
            ) : null}
          </div>
        </div>
  
        {/* MODALOK */}
        <UserOwnExchangesModalOtherProfile
          show={modalShowU}
          onHide={() => setModalShowU(false)}
          userO={selectedUser}
        />
        <UserOwnExchangesModalBook
          show={modalShowB}
          onHide={() => setModalShowB(false)}
          book={selectedBook}
        />
      </div>
    );
}