import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import useAuthContext from '../contexts/AuthContext'
import NavigacioAdmin from '../pages/NavigacioAdmin'
import UsersTablazatAdmin from '../pages/UsersTablazatAdmin';

export default function AdminLayout() {
    const { user } = useAuthContext();
    return (
        user && user.role === 0 ? <> <NavigacioAdmin /> <UsersTablazatAdmin /> <Outlet /> </> : <Navigate to="/bejelentkezes" />
        

    )
}