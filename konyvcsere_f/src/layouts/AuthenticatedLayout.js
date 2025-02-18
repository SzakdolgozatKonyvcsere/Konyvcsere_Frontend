import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import useAuthContext from '../contexts/AuthContext'
import NavigacioUser from '../pages/NavigacioUser';

export default function AdminLayout() {
    const { user } = useAuthContext();
    return (
        user? <> <NavigacioUser /> <Outlet /> </> : <Navigate to="/bejelentkezes" />
        

    )
}