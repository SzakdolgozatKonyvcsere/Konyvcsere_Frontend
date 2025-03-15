import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function NavigacioAdmin() {
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            Kezdőlap
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="nav-link" to="/tartalomszerk">
                            Tartalom szerkesztése
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <button className="nav-link" onClick={() => { logout() }}>
                            Kijelentkezés
                        </button>
                    </li>


                </ul>
                <div className="navbar-profile">
                    <Link className="nav-link" to="/profil">
                        <p className="user--name">{user!==null?user.full_name:"Vendég"}</p>
                        <img className="user--profile-picture" alt="felhasználó profilképe" src={user!==null?user.img_url:"user_basic_pfp.jpg"}></img>
                    </Link>
                </div>
            </div>
        </nav>
    );
}