import React from "react";

import { Outlet } from "react-router-dom";
import Navigacio from "../pages/Navigacio";

//biztosítja a vendégfelhasználók számára az alapelrendezést
export default function VendegLayout() {
    return (
        <>
            <Navigacio />

            <Outlet />
        </>
    );
}