import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import {useEffect} from "react";

function ProtectedRoute({ roles, element }) {
    const navigate = useNavigate();
    const isAuthenticated = AuthService.isAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const userRoles = AuthService.getRoles();
            if (roles && !roles.some(role => userRoles.includes(role))) {
                navigate('/unauthorized');
            }
        }
    }, [isAuthenticated, navigate, roles]);

    return isAuthenticated ? element : null;
}
export default ProtectedRoute;
