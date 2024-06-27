import {useContext, useEffect} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const IsNotLogged = () => {
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
    }, [isAuthenticated]);

    return !isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default IsNotLogged;
