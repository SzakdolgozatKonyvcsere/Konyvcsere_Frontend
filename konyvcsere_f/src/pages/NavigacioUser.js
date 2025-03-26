import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";


export default function NavigacioUser() {
    const { user, logout } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    //cim navban:
    const [showTitle, setShowTitle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {  // 100px után a cím bekerül a navbarba
        setShowTitle(true);
      } else {
        setShowTitle(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //cim navban vege


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
                {/* egy sor a navban címért*/}
                {showTitle && <div className="title-in-navbar">Könyvek keresése</div>}


                
                {menuOpen && (
                    <ul className="list-group position-absolute mt-2 bg-white shadow rounded p-2">
                        <li className="list-group-item border-0">
                            <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Kezdőlap</Link>
                        </li>
                        <li className="list-group-item border-0">
                            <Link className="nav-link" to="/konyvfeltoltes" onClick={() => setMenuOpen(false)}>Könyv feltöltés</Link>
                        </li>
                        <li className="list-group-item border-0">
                            <Link className="nav-link" to="/konyvek-sajat" onClick={() => setMenuOpen(false)}>Feltöltött könyveim</Link>
                        </li>
                        <li className="list-group-item border-0">
                            <Link className="nav-link" to="/konyvkereses" onClick={() => setMenuOpen(false)}>Könyv keresés</Link>
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
                            src={user ? `http://localhost:8000/${user.img_url}` : "/user_basic_pfp.jpg"} 
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}