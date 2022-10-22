import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userInfo } = useSelector(state => state.loginReducer);
    if(!userInfo || !userInfo.userId) return <Navigate replace to="/login" />
    return children;
};

export default PrivateRoute;