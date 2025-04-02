import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { CardFooter } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import useAuthContext from "../../contexts/AuthContext";
import UserOwnExchangesCard1_ from "./UserOwnExchangesCard1_";
import { FaPlus } from "react-icons/fa6";
import UserOwnExchangesModalBook from "./UserOwnExchangesModalBook";
import UserOwnExchangesModalOtherProfile from "./UserOwnExchangesModalOtherProfile";
import UserOwnExchangesModalCooseBook from "./UserOwnExchangesModalCooseBook";

//1. masik kerte a konyvem: elfogadom/elutasitom - patch
//2. elfogadtam a kerelmet es ki kell valasztanom tole konyvet 
//3. kivalasztottam konyvet, azt elkuldom - patch

export default function UserOwnExchangesCard1(props) {

    const { getUserById, getBookByIdForExchange, patchAcceptExchange, patchExchangeSelectOfferedBook } = useApiContext();

    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
    const [offeredBook, setOfferedBook] = useState(null);

    //const [users, setUsers] = useState([]);
    //const [books, setBooks] = useState([]);
    
    const [clicked, setClicked] = useState(false);

    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [user, setUser] = useState("");

    const [exchangeData, setExchangeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Az állapot, hogy adatokat töltünk-e

    //modalok:
    const [modalShowB, setModalShowB] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const [modalShowU, setModalShowU] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    //const [modalShowChoose, setModalShowChoose] = useState(false);
    //const [selectedBookChoose, setSelectedBookChoose] = useState(null);
    
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
        /* const handleShowModalChoose = (book) => {
            if (book){
              setSelectedBookChoose(book);
              setModalShowChoose(true);
              
            }
            
        }; */
    
    // bejelentkezett user id
    useEffect(() => {
        if (authUser) {
            console.log("authUser.id:", authUser.id); // Ellenőrzés
            setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
            console.log("csere, bejelenkezett fh: ", user) //ok
        }
    }, [authUser]);

    // katt a képre s kiirja az adatokat - nem modal van ezek helyett?
    /* useEffect(() => {
        console.log("csere, bejelenkezett fh: ", user); // Ez most akkor fut le, ha a `user` állapot változik
    }, [user]); */

    // katt a képre s kiirja az adatokat
    const handleClickBook = () => {
        setClicked(!clicked);
        alert("Kattintottál a képre!");
    };
    const handleClickUser = () => {
        setClicked(!clicked);
        alert("Kattintottál a userre!");
    };

    // + kell egy modal konyv kivalasztos?? azt hogyan genyo

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
    }, [props.exchange?.desired_book_id, props.exchange, props.exchange?.offered_book_id]);
    //}, [props.exchange?.desired_book_id, props.exchange.exchange_status]);

    // 1. patch kérés
    /* const handleExchangeRequest = async () => {
        const exchangeId = props.exchange?.exchange_id;
        /* const exchangeRequest = {
            exchange_status: 'f'  // Csak a státuszt frissítjük 'f'-re
        }; //
        console.log("Kérelem frissítési adatok:", exchangeId);
        // PATCH kérés küldése a backendnek
        //patchAcceptExchange(exchangeId);
    try {
        // Küldd el a PATCH kérést
        const result = await patchAcceptExchange(exchangeId);

        // Ha sikeres a kérés, frissítsd a helyi állapotot a válasz alapján
        if (result) {
            // Itt frissítjük az exchange adatokat, amik a komponensben megjelennek
            setExchangeData(result);  // Az új adatokat beállítjuk, hogy újrarendereljen
        }
    } catch (error) {
        console.error("Hiba a PATCH kérés során:", error);
    }
    } */
    useEffect(() => {
        console.log("Frissült az exchanges állapot:", props.exchange);
        // Ez minden alkalommal lefut, amikor az exchanges változik.

        // Lekérjük a friss adatokat, amikor a PATCH kérést sikeresen elküldjük
        const patchAcceptExchangee = async () => {
            try {
                // Példa: adatbetöltés az API-ból
                const result = await patchAcceptExchangee(props.exchange?.exchange_id);
                setExchangeData(result);  // Adatok beállítása
                setIsLoading(false);  // Az adatok betöltődtek, nem vagyunk már loading állapotban
            } catch (error) {
                console.error("Hiba az adatbetöltés során:", error);
                setIsLoading(false);  // Ha hiba van, ne maradjunk végtelen loadingban
            }
        };

        patchAcceptExchangee();
    }, [props.exchange?.exchange_id, isLoading]); // Ha az exchanges változik, akkor ez a blokk fut le
    // +
    const handleExchangeRequest = async () => {
        

        const exchangeId = props.exchange?.exchange_id;
        if (!exchangeId) {
            console.error("Nincs exchange ID, a kérés nem küldhető.");
            return;
        }

        try {
            // Küldd el a PATCH kérést
            await patchAcceptExchange(exchangeId);
        } catch (error) {
            console.error("Hiba a PATCH kérés során:", error);
        }
    };





    // kivalasztott konyv kezelese
    
    // Betöltjük a könyvet, ha van tárolt adat
  useEffect(() => {
    const savedBook = localStorage.getItem("selectedBook");
    if (savedBook) {
        const book = JSON.parse(savedBook);
        setOfferedBook(book);
        console.log("Offered book:", book);
    }
  }, []);

  // 2. patch kérés
  const handleExchangeRequest2 = async () => {
    const savedBook = localStorage.getItem("selectedBook");
    if (!savedBook) {
        alert("Válassz egy könyvet először!");
        return;
    }
    console.log("p2: ", savedBook) 
    const book = JSON.parse(savedBook);
    const exchangeId = props.exchange?.exchange_id;
    console.log("p2: ", book) 
    console.log("p2: ", exchangeId)
    console.log("p2: ", book.offer_id)

    // Meghívjuk az API-t a könyv adatainak elküldésére
    const result = await patchExchangeSelectOfferedBook(exchangeId, book.offer_id);

    // Ha sikeres volt, töröljük a localStorage-ból a kiválasztott könyvet
    if (result) {
        localStorage.removeItem("selectedBook");
        alert("Sikeresen elküldted a kiválasztott könyvet!");
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
                        <div className="arrow">
                            <FaArrowRightLong />
                        </div>
                        <div className="wantedBook">
                            <span>Érdekelt könyvem: </span><br />
                            {desiredBook ? (
                                <div className="wantedBook2">
                                    <img className='exchange-books__image' 
                                        src={desiredBook.img_url ? `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'} 
                                        onClick={() => handleShowModalB(desiredBook)}
                                        style={{ cursor: "pointer" }} 
                                    /><br />
                                    <UserOwnExchangesModalBook
                                                        show={modalShowB}
                                                        onHide={() => setModalShowB(false)}
                                                        book={selectedBook} 
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
                                    <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" 
                                    className="user--profile-picture" />
                                    <span className="userProfileName">{interestedUser.full_name}</span>
                                </div>   
                            ) : (
                                <p>Érdeklődő felhasználó: Ismeretlen</p>
                            )}
                                
                                
                            <Link to={`/profil/${props.exchange.interested_user_id}/valasztas`} 
                            className="feltoltoUser" style={{ cursor: "pointer" }}>
                            {offeredBook ? (
                                <div className='feltoltoUserBookImage'>
                                    <img className="exchange-books__image" src={offeredBook?.img_url ? `http://localhost:8000/${offeredBook.img_url}` : '/basic_book.png'}
                                    alt={offeredBook?.title || 'Alapértelmezett könyv'} />
                                    <span className="exchange-books__title">{offeredBook.title}</span>
                                </div>
                                ) : (
                                <div className="plusIcon">
                                    <FaPlus className="plus" />
                                </div>
                                )}
                            </Link>
                            
                            {/*<span className="exchange-books__title">{desiredBook.title}</span>*/}

                        
                        </div>
                        <div className="arrow">
                            <FaArrowLeftLong />
                        </div>
                        <div className="wantedBook">
                            <span>Érdekelt könyvem: </span><br />
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
                    </>
                    
                )}
                </div>
                <div className="card-footer">
                <button className="btn btn-primary -x">X</button>
                {props.exchange.exchange_status === 'k' ? (
                    <button className="btn btn-primary -yes" onClick={handleExchangeRequest}>
                        Elfogadom <BiCheck />
                    </button>
                ) : props.exchange.exchange_status === 'f' ? (
                    <button className="btn btn-primary -yes" onClick={handleExchangeRequest2}>
                      Kérem elküldeni <BiCheck />
                    </button>
                  ):null}
                </div>
            </div>

        </div>
    );
}