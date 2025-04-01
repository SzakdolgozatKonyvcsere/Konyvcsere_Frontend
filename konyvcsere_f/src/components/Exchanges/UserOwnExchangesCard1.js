import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { CardFooter } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import useAuthContext from "../../contexts/AuthContext";
import UserOwnExchangesCard1_ from "./UserOwnExchangesCard1_";
import { FaPlus } from "react-icons/fa6";

export default function UserOwnExchangesCard1(props) {

    const { getUserById, getBookByIdForExchange, patchAcceptExchange } = useApiContext();

    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [desiredBookOwnerUser, setDesiredBookOwnerUser] = useState(null);
    const [offeredBook, setOfferedBook] = useState(null);

    //const [users, setUsers] = useState([]);
    //const [books, setBooks] = useState([]);
    
    const [clicked, setClicked] = useState(false);

    const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése    
    const [user, setUser] = useState("");
    
    // bejelentkezett user id
    useEffect(() => {
        if (authUser) {
            console.log("authUser.id:", authUser.id); // Ellenőrzés
            setUser(authUser.id); // Az authUser objektum id-ját állítjuk be
            console.log("csere, bejelenkezett fh: ", user) //ok
        }
    }, [authUser]);

    /* useEffect(() => {
        console.log("csere, bejelenkezett fh: ", user); // Ez most akkor fut le, ha a `user` állapot változik
    }, [user]); */

    // katt a képre s kiirja az adatokat
    const handleClickBook = () => {
        setClicked(!clicked);
        alert("Kattintottál a képre!");
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
    }, [props.exchange?.desired_book_id, props.exchange.exchange_status]);

    // 1. patch kérés
    const handleExchangeRequest = async () => {
        const exchangeId = props.exchange?.exchange_id;
        const exchangeRequest = {
            exchange_status: 'f'  // Csak a státuszt frissítjük 'f'-re
        };
        console.log("Kérelem frissítési adatok:", exchangeRequest);

        // PATCH kérés küldése a backendnek
        patchAcceptExchange(exchangeId);
    
    }
    useEffect(() => {
        console.log("Frissült az exchanges állapot:", props.exchange);
        // Ez minden alkalommal lefut, amikor az exchanges változik.
    }, [props.exchange]); // Ha az exchanges változik, akkor ez a blokk fut le

    

    return(
        <div className="exchangesStage1">
            <div className="card 1">
            <div className="card-header">
                {props.exchange.exchange_status === 'k' ? "Kérelmed érkezett!" : "Könyv kiválasztás szükséges!"}   
            </div>
            <div className="card-body">
            {/* 1. */}
                {/* Ha az exchange_status "k" */}
                {props.exchange.exchange_status === 'k' && (
                    <>
                        <div className="incomingProfile">
                            <span>Érdeklődő felhasználó: </span><br />
                            {interestedUser ? (
                                <Link to={`/profil/${interestedUser.id}`} className="feltoltoUser">
                                    <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture" /><br />
                                    <span className="userProfileName">{interestedUser.full_name}</span>
                                </Link>
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

                {/* 2. */}
                    {/* Ha az exchange_status "f" és az offered_book_id null */}
                {props.exchange.exchange_status === 'f' && props.exchange.offered_book_id === null && (
                    <>
                        <div className="selectBookSection">
                            <p>A csere elindult, de még nem választottál könyvet! </p><br />
                            <p>Kérlek, válassz egyet tőle:</p>
                            {interestedUser ? (
                                <Link to={`/profil/${interestedUser.id}`} className="feltoltoUserMini">
                                    <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture-Mini" /><br />
                                    <span className="userProfileNameMini">{interestedUser.full_name}</span>
                                </Link>
                            ) : (
                                <p>Érdeklődő felhasználó: Ismeretlen</p>
                            )}
                            <div className="plusIcon">
                                <FaPlus />
                            </div>
                            {/*<span className="exchange-books__title">{desiredBook.title}</span>*/}

                        
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
                {props.exchange.exchange_status === 'k' && (
                    <button className="btn btn-primary -yes" onClick={handleExchangeRequest}>
                        Elfogadom <BiCheck />
                    </button>
                )}
                </div>
            </div>

        </div>
    );
}