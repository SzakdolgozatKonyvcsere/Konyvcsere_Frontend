import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function NavigacioVendeg() {
    const { user, logout } = useAuthContext();

    return (
        <nav className="navbar navbar-vendeg">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">Kezdőlap</Link>
                    </li>
                    {user ? (
                        <li className="navbar-item">
                            <button className="nav-link" onClick={() => { logout() }}>Kijelentkezés</button>
                        </li>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/bejelentkezes">Bejelentkezés</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/regisztracio">Regisztráció</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className="navbar-profile">
                    <p className="user--name">{user !== null ? user.full_name : "Vendég"}</p>
                    <a href="#">
                        <img className="user--profile-picture" alt="felhasználó profilképe" src={user !== null ? user.img_url : "basic_pfp.png"} />
                    </a>
                </div>
            </div>
        </nav>
    );
}
