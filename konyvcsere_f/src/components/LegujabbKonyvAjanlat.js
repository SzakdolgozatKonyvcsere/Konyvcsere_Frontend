import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { myAxios } from "../api/axios";

function LegujabbKonyvAjanlat() {

    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const interval_ms = 5000;

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

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prev => (prev + 1) % (newBooks.length || 1));
        }, interval_ms);
        return () => clearInterval(timer);
    }, [newBooks]);

    if (newBooks.length < 2) return <p>🔄 Betöltés...</p>;

    const visibleBooks = [
        newBooks[index],
        newBooks[(index + 1) % newBooks.length]
    ];

    return (
        <div className="ajanlas">
            <h5>Legújabb ajánlatok:</h5>

            <div className="latvany">
                <AnimatePresence mode="wait">
                    <motion.ul
                        key={index}
                        initial={{ x: 200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ x: { type: "tween", duration: 0.6 }, opacity: { duration: 0.4 } }}
                        className="carousel-inner"
                        style={{ display: "flex", gap: "30px", justifyContent: "center" }}
                    >
                        {visibleBooks.map((book, i) => (
                            <li key={`${book.title}-${i}`} className="book-item">
                                <img src={book.img_url || "/basic_book.png"} alt={book.title} className="kezdolapBooks" />
                                <h6>{book.title}</h6>
                                <p>{book.author_name}</p>
                            </li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default LegujabbKonyvAjanlat;