import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import useAuthContext from '../contexts/AuthContext'
import NavigacioAdmin from '../components/NavigacioAdmin'

export default function AdminLayout() {
    const { user } = useAuthContext();
    return (
        user && user.role === 0 ? <> <NavigacioAdmin /> <UserTablazatAdmin /> <Outlet /> </> : <Navigate to="/bejelentkezes"></Navigate>
        

    )
}