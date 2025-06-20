import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const ProtectiveRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth()
    if (!user._id) {
        return <Navigate to={'/login'} replace />
    }
    return children
}
export default ProtectiveRoute