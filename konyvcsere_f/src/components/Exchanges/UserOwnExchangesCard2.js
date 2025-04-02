import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import useAuthContext from "../../contexts/AuthContext";
import { BiCheck } from "react-icons/bi";
import { FaArrowRightLong, FaArrowLeftLong, FaArrowRightArrowLeft } from "react-icons/fa6";
import UserOwnExchangesModalOtherProfile from "./UserOwnExchangesModalOtherProfile";

//1. varakozas: en kertem eloszor, valaszara, konyvere varok 
//2. beleegyezes: ha a korabbi valasza, konyve megjott, elfogadom/elutasitom - patch
//3. varakozas: o kerte eloszor, valasztottam konyvet es az o beleegyezesere varok
export default function UserOwnExchangesCard2(props) {

    const { getUserById, getBookByIdForExchange, patchAcceptExchange, patchExchangeSelectOfferedBook } = useApiContext();
    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [offeredBook, setOfferedBook] = useState(null);
    const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
    const [user, setUser] = useState("");
    const [clicked, setClicked] = useState(false);
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
                const bookOfferedData = await getBookByIdForExchange(props.exchange.offered_book_id);

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

    // Ha az interested_user nem egyezik az authUser-rel
    const isInterestedUser = interestedUser && interestedUser.id === authUser.id;

    const handleExchangeRequest2 = async () => {
        const exchangeId = props.exchange?.exchange_id;
        const savedBook = localStorage.getItem("selectedBook");
        if (!savedBook) {
            alert("Válassz egy könyvet először!");
            return;
        }
        const book = JSON.parse(savedBook);
        const result = await patchExchangeSelectOfferedBook(exchangeId, book.id);

        if (result) {
            localStorage.removeItem("selectedBook");
            alert("Sikeresen elküldted a kiválasztott könyvet!");
        }
    }


    return(
        <>
        <div className="exchangesStage2">
        <div className="card 1">
        <div className="card-header">
            {props.exchange.exchange_status === 'f' && offeredBook && !isInterestedUser || isInterestedUser && !offeredBook ? "Csere partnered válasza.." : "Találat! Elfogadod a csere feltételeit?"}
        </div>
        <div className="card-body">
            {/* 1. Ha az interestedUser nem az authUser 
                - varakozas: o kerte eloszor, valasztottam konyvet es az o beleegyezesere varok
                - nem en vagyok interested user, exch stat: f, masik book is megvan */}
                
            {!isInterestedUser && offeredBook && Object.keys(offeredBook).length > 0  &&(
                <div className="waiting">
                    <div className='sectionLeft'>
                    
                        <div className="incomingProfile">
                        <span>Másik felhasználó: </span><br />
                            {interestedUser ? ( 
                                <div className="feltoltoUser" >
                                    <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" 
                                    onClick={() => handleShowModalU(interestedUser)}
                                    style={{ cursor: "pointer" }} 
                                    className="user--profile-picture" /><br />
                                    <UserOwnExchangesModalOtherProfile
                                            show={modalShowU}
                                            onHide={() => setModalShowU(false)}
                                            userO={selectedUser} 
                                    />
                                    <span className="userProfileName">{interestedUser.full_name}</span>
                                </div>
                                ) : (
                                    <p>Érdeklődő felhasználó: Ismeretlen</p>
                                )}
                        </div>
                        <div className="wantedBook">
                            
                            {offeredBook ? (
                                <div className="wantedBook2">
                                    <img className='exchange-books__image' 
                                        src={offeredBook.img_url ? `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'} 
                                        onClick={handleClickBook}
                                        style={{ cursor: "pointer" }} 
                                    /><br />
                                    <span className="exchange-books__title">{offeredBook.title}</span>
                                </div>
                            ) : (
                                <p>Érdekelt könyv: Ismeretlen</p>
                            )}

                        </div>
                    </div>
                    <div className="arrow">
                        <FaArrowRightArrowLeft />
                    </div>
                    <div className="sectionRight">
                        <div className="incomingProfile">
                            <span>Én felhasználó: </span><br />
                            {authUser ? ( 
                                <div className="feltoltoUser" >
                                    <img src={authUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" 
                                    onClick={() => handleShowModalU(authUser)}
                                    style={{ cursor: "pointer" }} 
                                    className="user--profile-picture" />
                                    <UserOwnExchangesModalOtherProfile
                                            show={modalShowU}
                                            onHide={() => setModalShowU(false)}
                                            userO={selectedUser} 
                                    />
                                    <span className="userProfileName">{authUser.full_name}</span>
                                </div>
                                ) : (
                                    <p>Érdeklődő felhasználó: Ismeretlen</p>
                                )}
                        </div>
                        <div className="wantedBook">
                                {desiredBook ? (
                                    <div className="wantedBook2">
                                        <img className='exchange-books__image' 
                                            src={desiredBook.img_url ? `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                                            onClick={handleClickBook}
                                            style={{ cursor: "pointer" }} 
                                        /><br />
                                        <span className="exchange-books__title">{desiredBook.title}</span>
                                    </div>
                                ) : (
                                    <p>Érdekelt könyv: Ismeretlen</p>
                                )}
                        </div>
                    </div>
                    
                </div>
            )}

            {/* 2. Ha az interestedUser megegyezik az authUser-rel, és offeredBook is van 
                - varakozas: en kertem eloszor, valaszara, konyvere varok 
                - en profilon, masik konyve
                - en vagyok az interested, book offer null*/}
            {isInterestedUser && !offeredBook && (
                <div className="waiting">
                <div className='sectionLeft'>
                    <div className="desiredBook">
                        <span> hello{desiredBook.title}</span>
                    </div>
                </div>
                    <div className="arrow">
                        <FaArrowLeftLong />
                    </div>
                    <div className='sectionRight'>
                    <div className="desiredBook">
                        <span>{desiredBook?.title}</span>
                    </div>
                    </div>
                    <div className="statusText">
                        <p>A másik felhasználó beleegyezésére vár</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleExchangeRequest2}>
                        Elfogadom <BiCheck />
                    </button>
                    
                </div>
            )}

            {/* 3. Ha az interestedUser megegyezik az authUser-rel, és offeredBook VAN 
                - beleegyezes: ha a korabbi valasza, konyve megjott, elfogadom/elutasitom - patch
                - en vagyon interested, offered book van
                - gomb - patch */}
            {isInterestedUser && offeredBook && Object.keys(offeredBook).length > 0 && (
                <div className="answear">
                    
                    <div className='sectionLeft'>
                    
                        <div className="incomingProfile">
                        <span>Másik felhasználó 3: </span><br />
                            {desiredBookOwnerUser ? ( 
                                <div className="feltoltoUser" >
                                    <img src={desiredBookOwnerUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" 
                                    onClick={() => handleShowModalU(desiredBookOwnerUser)}
                                    style={{ cursor: "pointer" }} 
                                    className="user--profile-picture" /><br />
                                    <UserOwnExchangesModalOtherProfile
                                            show={modalShowU}
                                            onHide={() => setModalShowU(false)}
                                            userO={selectedUser} 
                                    />
                                    <span className="userProfileName">{desiredBookOwnerUser.full_name}</span>
                                </div>
                                ) : (
                                    <p>Érdeklődő felhasználó: Ismeretlen</p>
                                )}
                        </div>
                        <div className="wantedBook">
                            
                            {offeredBook ? (
                                <div className="wantedBook2">
                                    <img className='exchange-books__image' 
                                        src={offeredBook.img_url ? `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'} 
                                        onClick={handleClickBook}
                                        style={{ cursor: "pointer" }} 
                                    /><br />
                                    <span className="exchange-books__title">{offeredBook.title}</span>
                                </div>
                            ) : (
                                <p>Érdekelt könyv: Ismeretlen</p>
                            )}

                        </div>
                    </div>
                    <div className="arrow">
                        <FaArrowRightArrowLeft />
                    </div>
                    <div className="sectionRight">
                        <div className="incomingProfile">
                            <span>Én felhasználó 3: </span><br />
                            {authUser ? ( 
                                <div className="feltoltoUser" >
                                    <img src={authUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" 
                                    onClick={() => handleShowModalU(authUser)}
                                    style={{ cursor: "pointer" }} 
                                    className="user--profile-picture" />
                                    <UserOwnExchangesModalOtherProfile
                                            show={modalShowU}
                                            onHide={() => setModalShowU(false)}
                                            userO={selectedUser} 
                                    />
                                    <span className="userProfileName">{authUser.full_name}</span>
                                </div>
                                ) : (
                                    <p>Érdeklődő felhasználó: Ismeretlen</p>
                                )}
                        </div>
                        <div className="wantedBook">
                                {desiredBook ? (
                                    <div className="wantedBook2">
                                        <img className='exchange-books__image' 
                                            src={desiredBook.img_url ? `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                                            onClick={handleClickBook}
                                            style={{ cursor: "pointer" }} 
                                        /><br />
                                        <span className="exchange-books__title">{desiredBook.title}</span>
                                    </div>
                                ) : (
                                    <p>Érdekelt könyv: Ismeretlen</p>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="card-footer">
            {props.exchange.exchange_status === 'f' && offeredBook && !isInterestedUser || isInterestedUser && !offeredBook ? (
                <div>A másik felhasználó reakciójára vár..</div>
            ) : (
                <button className="btn btn-primary" onClick={handleExchangeRequest2}>
                    Elfogadom <BiCheck />
                </button>
            )}
        </div>
    </div>
        </div>
        
        </>
    );
}