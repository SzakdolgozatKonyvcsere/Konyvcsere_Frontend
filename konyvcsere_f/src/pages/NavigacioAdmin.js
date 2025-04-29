import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function NavigacioAdmin() {
    const { user, logout } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [editMenuOpen, setEditMenuOpen] = useState(false); // Lenyíló menü állapota

    return (
        <nav className="navbar navbar-user">
            <div className="container-fluid">
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="bi bi-list" style={{ fontSize: "1.8rem" }}></i>
                </button>

                {menuOpen && (
                    <ul className="list-group position-absolute mt-2 bg-white shadow rounded p-2">
                        {/*<li className="list-group-item border-0">
                            <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Kezdőlap</Link>
                        </li>*/}
                        <li className="list-group-item border-0">
                            <Link className="nav-link" to="/stats" onClick={() => setMenuOpen(false)}>Áttekintés</Link>
                        </li>
                        <li className="list-group-item border-0">
                            <button 
                                className="nav-link btn btn-link" 
                                onClick={() => setEditMenuOpen(!editMenuOpen)} // Lenyíló menü
                            >
                                Tartalom szerkesztése
                            </button>
                            {editMenuOpen && ( // Ha a menü nyitva van, akkor mutatja a linkeket
                                <ul className="ps-3">
                                    <li className="list-group-item border-0">
                                        <Link className="nav-link" to="/osszesuser" onClick={() => setMenuOpen(false)}>
                                            Felhasználók
                                        </Link>
                                    </li>
                                    <li className="list-group-item border-0">
                                        <Link className="nav-link" to="/osszeskonyv" onClick={() => setMenuOpen(false)}>
                                            Könyvek
                                        </Link>
                                    </li>
                                    <li className="list-group-item border-0">
                                        <Link className="nav-link" to="/osszescsere" onClick={() => setMenuOpen(false)}>
                                            Cserefolyamatok
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="list-group-item border-0">
                            <button className="nav-link btn btn-link" onClick={() => { logout(); setMenuOpen(false); }}>
                                Kijelentkezés
                            </button>
                        </li>
                    </ul>
                )}
                    
                <div className="navbar-profile">
                    <Link className="nav-link" to="/profil" onClick={() => setMenuOpen(false)}>
                        <p className="user--name">{user ? user.full_name : "Vendég"}</p>
                        <img 
                            className="user--profile-picture" 
                            alt="Profilkép" 
                            src={user ? `http://localhost:8000/${user.img_url}` : "http://localhost:8000/profile_pictures/user_basic_pfp.jpg"}  
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
