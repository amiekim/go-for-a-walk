import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const userEmail = localStorage.getItem("userEmail")
    if(!userEmail) return <Navigate replace to="/" />
    return children;
};

export default PrivateRoute;