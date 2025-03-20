{/*import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function NavigacioUser() {
    const { user, logout } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);
    
//javítani kell a menuOpent
    return (
        <div className="menucontainer">
            <nav className="navbar navbar-user">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}  
                        //hogyha menuOpen hamis, akkor a hidden class legyen rajta
                        //ha igaz akkor meg levesszük a hidden classt
                        //hidden display:none
                    >
                        ☰ 
                    </button>

                    <div className={`navbar-collapse ${menuOpen ? "" : "hidden"}`}>
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link className="nav-link" to="/">
                                Kezdőlap
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/konyvfeltoltes">
                                Könyv feltöltés
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/feltoltottkonyvek">
                                Feltöltött könyveim
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/konyvkereses">
                                Könyv keresés
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <button className="nav-link" onClick={() => { logout() }}>
                                Kijelentkezés
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Profil rész */}
                <div className="navbar-profile">
                    <Link className="nav-link" to="/bejelentkezettuser">
                        <p className="user--name">{user !== null ? user.full_name : "Vendég"}</p>
                        <img className="user--profile-picture" alt="felhasználó profilképe" src={user !== null ? user.img_url : "basic_pfp.png"} />
                    <Link className="nav-link" to="/profil">
                        <p className="user--name">{user!==null?user.full_name:"Vendég"}</p>
                        <img className="user--profile-picture" alt="felhasználó profilképe" src={user!==null?`http://localhost:8000/${user.img_url}`:"user_basic_pfp.jpg"} ></img>
                    </Link>
                </div>
            </div>
        </nav>
    </div>
    );
/*}