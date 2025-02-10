import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

//dinamikus navigáció
export default function NavigacioVendeg(){
    const {user,logout} = useAuthContext();

    return(
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link className="nav-link" to="/">Kezdőlap</Link>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item">
                                <button className="nav-link" onClick={()=>{logout()}}>Kijelentkezés</button>
                            </li>
                        </>
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
                    <p className="user--name">{user!==null?user.full_name:"Vendég"}</p>
                    <a href="#"><img className="user--profile-picture" alt="felhasználó profilképe" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBTym3IWgvwc58Oq_BCusGZKtqqllkljgw3g&s"></img></a>
                </div>
            </div>
        </nav>
    );
}