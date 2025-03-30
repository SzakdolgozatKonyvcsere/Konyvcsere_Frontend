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

    

    return(
        <div className="exchangesStage1">
            <div className="card">
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
                <span>Érdekelt könyv: </span><br />
                {desiredBook ? (
                    <div className="wantedBook2">
                        <img className='exchange-books__image' src={desiredBook.img_url ? `http://localhost:8000/${desiredBook.img_url}` : '/basic_book.png'}></img><br />
                        <span className="exchange-books__title">{desiredBook.title}</span>
                    </div>
                ) : (
                    <p>Érdekelt könyv: Ismeretlen</p>
                )}
                    
                </div>
            </div>

        </div>
    );
}