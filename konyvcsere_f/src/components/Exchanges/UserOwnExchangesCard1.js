import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { CardFooter } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import useAuthContext from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import UserOwnExchangesModalBook from "./UserOwnExchangesModalBook";
import UserOwnExchangesModalOtherProfile from "./UserOwnExchangesModalOtherProfile";
import UserOwnExchangesModalCooseBook from "./UserOwnExchangesModalCooseBook";
import useSelectedBook from "../../hooks/useSelectedBook";
import { useNavigate } from "react-router-dom";

//1. masik kerte a konyvem: elfogadom/elutasitom - patch
//2. elfogadtam a kerelmet es ki kell valasztanom tole konyvet 
//3. kivalasztottam konyvet, azt elkuldom - patch

export default function UserOwnExchangesCard1(props) {

    const { getUserById, getBookByIdForExchange, patchAcceptExchange, 
        patchExchangeSelectOfferedBook, getExchangeByUser, patchRejectExchange } = useApiContext();

    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
    const { selectedBook: offeredBook, saveBook, clearBook } = useSelectedBook(); //ezzel nem kell local storaget kozvetlenul hivni

    const navigate = useNavigate(); // szükséges a navigáláshoz
    const location = useLocation();

    useEffect(() => {
    // Ha a kiválasztott könyv újra betöltődött, loggoljuk (és UI frissül) - visszalépés után kell book megjelenítéséhez
    console.log("Visszanavigáltunk, új offeredBook állapot:", offeredBook);
    }, [location]);
    
    const [clicked, setClicked] = useState(false);

    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [user, setUser] = useState("");

    //const [exchangeData, setExchangeData] = useState(null);
    //const [isLoading, setIsLoading] = useState(true);  // Az állapot, hogy adatokat töltünk-e

    const { refreshExchanges } = props; // ezt szulo komponensbol propskent kapja

    //modalok:
    const [modalShowB, setModalShowB] = useState(false);
    const [selectedBookModal, setSelectedBookModal] = useState(null);

    const [modalShowU, setModalShowU] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

            const handleShowModalB = (book) => {
              if (book){
                setSelectedBookModal(book);
                setModalShowB(true);
                
              }
              
          };
          const handleShowModalU = (user) => {
            if (user){
              setSelectedUser(user);
              setModalShowU(true);
              
            }
            
        };
    
    // bejelentkezett user id
    useEffect(() => {
        if (authUser) {
            console.log("authUser.id:", authUser.id); // Ellenőrzés
            setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
            console.log("csere, bejelenkezett fh: ", user, authUser.id) //ok
        }
        console.log("csere, bejelenkezett fh 2x: ", user, authUser.id) //ok

    }, [authUser]);


    // kapott csere idkat bedobja s visszaadja a részletes adatait
    useEffect(() => {
        async function fetchData() {
            if (!props.exchange?.desired_book_id) return;
            try {
                const userInterestedData = await getUserById(props.exchange.interested_user_id);
                const bookDesiredData = await getBookByIdForExchange(props.exchange.desired_book_id);
                const userDesiredBookOwnerData = await getUserById(props.exchange.desired_book_owner_id);
                const bookOfferedData = await getBookByIdForExchange(props.exchange.offered_book_id);

                console.log("Kapott user interested:", userInterestedData);
                console.log("Kapott könyvek desired:", bookDesiredData, props.exchange.exchange_id);
                console.log("Kapott user desired book owner:", userDesiredBookOwnerData);
                console.log("Kapott könyvek offered:", bookOfferedData, props.exchange.exchange_id);
                

                setInterestedUser(userInterestedData || null);
                setDesiredBook(bookDesiredData || null);
                //setDesiredBookOwnerUser(userDesiredBookOwnerData || null);
                //setOfferedBook(bookOfferedData || null);
                
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
        }
        fetchData();
    }, [props.exchange]);
    //}, [props.exchange?.desired_book_id, props.exchange.exchange_status]);

    // 1. patch kérés
    // offeredBook frissítése location váltásra (pl. visszanavigálás után)
  useEffect(() => {
    const saved = localStorage.getItem("selectedBook");
    console.log("Frissítjük a selectedBook state-et a storage alapján:", saved);
    if (saved) {
        try {
          const parsed = JSON.parse(saved);
          saveBook(parsed);
        } catch (err) {
          console.error("Hiba a JSON parse-nál:", err);
        }
      }
  }, [location]);

// patch 
const handleExchangeRequest = async () => {
        const exchangeId = props.exchange?.exchange_id;
        if (!exchangeId) {
            console.error("Nincs exchange ID, a kérés nem küldhető.");
            return;
        }
        try {
            const updatedExchange = await patchAcceptExchange(exchangeId);
                if (updatedExchange) {
                // frissiti a teljes listát (a szülő komponensben)
                if (typeof refreshExchanges === 'function') {
                    refreshExchanges(); 
                }
            }
        } catch (error) {
            console.error("Hiba a PATCH kérés során:", error);
        }
    };

  // 2. patch kérés
  const handleExchangeRequest2 = async () => {
    const savedBook = localStorage.getItem("selectedBook");
    if (!savedBook) {
        //alert("Válassz egy könyvet először!");
        console.log("Válassz egy könyvet először!- 2.patch")
        return;
    }
    console.log("p2: ", savedBook) 
    const book = JSON.parse(savedBook);
    const exchangeId = props.exchange?.exchange_id;
    console.log("p2: ", book) 
    console.log("p2: ", exchangeId)
    console.log("p2: ", book.offer_id)

    try {
        // Meghívjuk az API-t a könyv adatainak elküldésére
        const result = await patchExchangeSelectOfferedBook(exchangeId, book.offer_id);
        // Ha sikeres volt, töröljük a localStorage-ból a kiválasztott könyvet
        if (result) {
          localStorage.removeItem("selectedBook"); 
          //alert("Sikeresen elküldted a kiválasztott könyvet!");
    
          // Frissítjük az exchanges listát
          if (typeof refreshExchanges === "function") {
            refreshExchanges();
          }
        }
      } catch (error) {
        console.error("Hiba a könyv elküldésénél:", error);
      }

  }

  const handleReject = async () => {
    const exchangeId = props.exchange?.exchange_id;
        if (!exchangeId) {
            console.error("Nincs exchange ID, a kérés nem küldhető.");
            return;
        }
        try {
            // Meghívjuk az API-t a könyv adatainak elküldésére
            const rejection = await patchRejectExchange(exchangeId);
            // Ha sikeres volt, töröljük a localStorage-ból a kiválasztott könyvet
            if (rejection) {
              // Frissítjük az exchanges listát
              if (typeof refreshExchanges === "function") {
                refreshExchanges();
              }
            }
          } catch (error) {
            console.error("Hiba a könyv elküldésénél:", error);
          }

  }


    
//csak azokat mutassa ahol a ket user id ban benne van az auth user
    return(
        <div className="exchangesStage1">
            <div className="card 1">
            <div className="card-header">
                {props.exchange.exchange_status === 'k' ? "Kérelmed érkezett!!!!!" : "A csere elindult, most válassz egy könyvet cserébe!"}   
            </div>
            <div className="card-body">
            {/* 1. */}
                {/* Ha az exchange_status "k" */}
                {props.exchange.exchange_status === 'k' && (
                    <>
                        <div className="incomingProfile">
                            <span>Érdeklődő felhasználó: </span><br />
                            {/*<Link to={`/profil/${interestedUser.id}`} className="feltoltoUser">*/}
                            {interestedUser ? ( 
                                <div className="feltoltoUser" >
                                    <img src={interestedUser?.img_url ? interestedUser.img_url.startsWith("http") ? interestedUser.img_url : `http://localhost:8000/${interestedUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
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
                        <div className="arrow">
                            <FaArrowRightLong />
                        </div>
                        <div className="wantedBook">
                            <span>Érdekelt könyvem: </span><br />
                            {desiredBook ? (
                                <div className="wantedBook2">
                                    <img className='exchange-books__image exchangecardimg' 
                                        src={desiredBook?.img_url ? desiredBook.img_url.startsWith("http") ? desiredBook.img_url : `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                                        onClick={() => handleShowModalB(desiredBook)}
                                        style={{ cursor: "pointer" }} 
                                    /><br />
                                    <UserOwnExchangesModalBook
                                                        show={modalShowB}
                                                        onHide={() => setModalShowB(false)}
                                                        book={selectedBookModal} 
                                                    />
                                    <span className="exchange-books__title">{desiredBook.title}</span>
                                </div>
                            ) : (
                                <p>Érdekelt könyv: Ismeretlen</p>
                            )}
                        </div>
                    </>
                )}

                {/* 2. */}
                    {/* Ha az exchange_status "f" és az offered_book_id null */}
                {props.exchange.exchange_status === 'f' && props.exchange.offered_book_id === null && (
                    <>
                     {/*<p>A csere elindult, de még nem választottál könyvet! </p><br />*/}
                        <div className="selectBookSection">
                            
                            {/*<p>Kérlek, válassz egyet tőle:</p>*/}
                            {interestedUser ? (
                                <div className="feltoltoUserSmall" >
                                    <img src={interestedUser?.img_url ? interestedUser.img_url.startsWith("http") ? interestedUser.img_url : `http://localhost:8000/${interestedUser.img_url}` : "user_basic_pfp.jpg"} alt="Profilkép" 
                                    className="user--profile-picture" />
                                    <span className="userProfileName">{interestedUser.full_name}</span>
                                </div>   
                            ) : (
                                <p>Érdeklődő felhasználó: Ismeretlen</p>
                            )}
                                
                                
                            
                            {offeredBook ? (
                                // ha van kiválasztott könyv
                                <div className='feltoltoUserBookImage' onClick={() => {
                                    clearBook(); // Hookból, a useSelectedBook van hasznalva
                                }}>
                                    <img className="exchange-books__image exchangecardimg" src={offeredBook?.img_url ? offeredBook.img_url.startsWith("http") ? offeredBook.img_url : `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'}
                                    alt={offeredBook?.title || 'Alapértelmezett könyv'} />
                                    <span className="exchange-books__title">{offeredBook.title}</span>
                                    <small>(Katt a cseréhez!)</small>
                                </div>
                                ) : (
                                // ha nincs kiválasztott könyv
                                <div className="plusIcon" onClick={() => navigate(`/profil/${props.exchange.interested_user_id}/valasztas`)}>
                                    <FaPlus className="plus" />
                                </div>
                                )}
                            
                            
                            {/*<span className="exchange-books__title">{desiredBook.title}</span>*/}

                        
                        </div>
                        <div className="arrow">
                            <FaArrowLeftLong />
                        </div>
                        <div className="wantedBook">
                            <span>Érdekelt könyvem: </span><br />
                            {desiredBook ? (
                                <div className="wantedBook2">
                                    <img className='exchange-books__image exchangecardimg' 
                                        src={desiredBook?.img_url ? desiredBook.img_url.startsWith("http") ? desiredBook.img_url : `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                                        onClick={() => handleShowModalB(desiredBook)}
                                        style={{ cursor: "pointer" }} 
                                    /><br />
                                    <UserOwnExchangesModalBook
                                                        show={modalShowB}
                                                        onHide={() => setModalShowB(false)}
                                                        book={selectedBookModal} 
                                                    />
                                    <span className="exchange-books__title">{desiredBook.title}</span>
                                </div>
                            ) : (
                                <p>Érdekelt könyv: Ismeretlen</p>
                            )}
                        </div>
                    </>
                    
                )}
                </div>
                <div className="card-footer">
                <button className="btn btn-primary -x" onClick={handleReject}> X </button>
                {props.exchange.exchange_status === 'k' ? (
                    <button className="btn btn-primary -yes" onClick={handleExchangeRequest}>
                        Elfogadom <BiCheck />
                    </button>
                ) : props.exchange.exchange_status === 'f' ? (
                    <button className="btn btn-primary -yes" onClick={handleExchangeRequest2}>
                      Elküldöm <BiCheck />
                    </button>
                  ):null}
                </div>
            </div>

        </div>
    );
}