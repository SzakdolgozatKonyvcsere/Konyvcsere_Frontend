import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Navigacio from "../pages/NavigacioVendeg";

import useAuthContext from "../contexts/AuthContext";
import NavigacioVendeg from "../pages/NavigacioVendeg";


//biztosítja a vendégfelhasználók számára az alapelrendezést
export default function VendegLayout() {
    const { user } = useAuthContext(); 
    return !user ? <>    <NavigacioVendeg /> <Outlet /> </>  : <Navigate to="/" />;

}