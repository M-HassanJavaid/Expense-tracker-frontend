import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const user = useSelector((state)=> state.user);
    console.log('protenetd')
    console.log(user)

    if (!user) {
        console.log(user)
        return <Navigate to="/login" replace />
    } else if (!user.isVerified){
        return <Navigate to="/getVerificationEmail" replace />
    }

    return children
}

export default ProtectedRoute