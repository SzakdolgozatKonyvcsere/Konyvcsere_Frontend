import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function UserOwnExchangesCard1(props) {

    const { getUserById, getBookByIdForExchange } = useApiContext();

    const [interestedUser, setInterestedUser] = useState(null);
    const [desiredBook, setDesiredBook] = useState(null);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    


    useEffect(() => {
        async function fetchData() {
            if (!props.exchange?.desired_book_id) return;
            try {
                const userData = await getUserById(props.exchange.interested_user_id);
                const bookData = await getBookByIdForExchange(props.exchange.desired_book_id);

                console.log("Kapott user:", userData);
                console.log("Kapott könyvek:", bookData, props.exchange.exchange_id);
                

                setInterestedUser(userData || null);
                setDesiredBook(bookData || null);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
        }
        fetchData();
    }, [props.exchange?.desired_book_id]);

    
        //const { user: authUser } = useAuthContext(); // Bejelentkezett felhasználó lekérése
            /* const [user, setUser] = useState("");
            
            //feltoltoUser=getUsers('/user/{id}')
    
            useEffect(() => {
                console.log("Kapott userId:", userId);
                if (!userId) {
                    console.warn("Hibás userId:", userId);
                    return;
                }
                
                    getUserById(userId)
                    .then(user => {
                        if (user) {
                            console.log("Lekért felhasználó:", user);
                            setFeltoltoUser(user);
                        } else {
                            console.warn("Felhasználó nem található!");
                        }
                    })
                        
                    .catch(error => console.error("Hiba a user lekérdezésnél:", error));
                        //setFeltoltoUser(user))
                    //setFeltoltoUser(user || null);
                    console.log("Feltöltő felhasználó állapota frissült:", feltoltoUser);
                
    
            }, [userId], [feltoltoUser]);
        
            if (!feltoltoUser) return <p>Feltöltő: Ismeretlen</p>;
    

 */

    return(
        <div className="exchangesStage1">
            <div className="card">
                <div className="incomingProfile">
                    <span>Érdeklődő felhasználó: </span><br />
                    {interestedUser ? (
                        <Link to={`/profil/${interestedUser.id}`} className="feltoltoUser">
                            <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture" />
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
                <span>Érdekelt könyv: </span>
                {desiredBook ? (
                    <div>
                        <span>{desiredBook.title}</span>
                        <img className='exchange-books__image' src={desiredBook.img_url ? `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'}></img>
                    </div>
                ) : (
                    <p>Érdekelt könyv: Ismeretlen</p>
                )}
                    
                </div>
            </div>

        </div>
    );
}