import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function NavigacioUser() {
    const {  user, logout } = useAuthContext();

    return (
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">
                            Kezdőlap User
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
                        <button className="nav-link" onClick={() => { logout() }}>
                            Kijelentkezés
                        </button>
                    </li>


                </ul>
                <div className="navbar-profile">
                    <p className="user--name">{user!==null?user.full_name:"Vendég"}</p>
                    <a href="#"><img className="user--profile-picture" alt="felhasználó profilképe" src={user!==null?user.img_url:"basic_pfp.png"}></img></a>
                </div>
            </div>
        </nav>
    );
}