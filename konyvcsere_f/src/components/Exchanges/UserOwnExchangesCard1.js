import { useEffect, useState } from "react";
import useApiContext from "../../contexts/ApiContext";
import { Link } from "react-router-dom";

export default function UserOwnExchangesCard1(props) {

    const { getUserById, getBooks } = useApiContext();

    //const [interestedUser, setInterestedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    


    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUserById();
                const bookData = await getBooks();

                setUsers(userData || []);
                setBooks(bookData || []);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            }
        }
        fetchData();
    }, []);

    const interestedUser = users.find(user => user.id === props.exchange.interested_user_id);
    const desiredBook = books.find(book => book.offer_id === props.exchange.desired_book_id);
    const desiredBookOwner = users.find(user => user.id === props.exchange.desired_book_owner_id);
    const offeredBook = books.find(book => book.offer_id === props.exchange.offered_book_id);
     
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
                {interestedUser ? (
                    <Link to={`/profil/${interestedUser.id}`} className="feltoltoUser">
                        <img src={interestedUser.img_url || "user_basic_pfp.jpg"} alt="Profilkép" className="user--profile-picture" />
                        <span className="userProfileName">{interestedUser.full_name}</span>
                    </Link>
                ) : (
                    <p>Feltöltő: Ismeretlen</p>
                )}

                
                </div>
                <div className="wantedBook">
                </div>
            </div>

        </div>
    );
}