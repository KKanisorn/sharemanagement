import React from 'react';
import { Navigate } from 'react-router-dom';

const VaildToken = ({ children }) => {
    const token = localStorage.getItem('token');
    // console.log(token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    else{
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default VaildToken;