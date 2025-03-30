import React, { useState, useEffect } from "react";
import { myAxios } from "../api/axios";

function LegujabbKonyvAjanlat() {

    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNewBooks = async () => {
            try {
                const response = await myAxios.get("/api/new-book-offers");
                setNewBooks(response.data);
            } catch (error) {
                console.error("Hiba:", error);
            } finally {
                setLoading(false); 
            }
        };

        loadNewBooks();
    }, []);

    return (
        <div className="ajanlas">
            <h5>Legújabb ajánlatok:</h5>

            {loading ? (
                <p>🔄 Betöltés...</p> 
            ) : (
                <ul>
                    {newBooks.length > 0 ? (
                        newBooks.map((book) => (
                            <li key={book.id} className="book-item">
                            {/* ez ugyanaz amivel a tobbi kepet is megjelenitjuk: (megnezi h van e, belerakja egy urlbe, ha nincs, akkor a basicet rakja) */}
                            <img className='kezdolapBooks' src={book.img_url ? `http://localhost:8000/${book.img_url}` : '/basic_book.png'} alt={book.title} loading="lazy"  />
                                <h6>Cím: {book.title}</h6>
                                <p>Szerző: {book.author_name}</p>
                                <p>Feltöltve: {new Date(book.created_at).toLocaleDateString()}</p>
                            </li>
                        ))
                    ) : (
                        <p>Nincs elérhető könyv.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default LegujabbKonyvAjanlat;