import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
        // If no token ➔ redirect to login
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;