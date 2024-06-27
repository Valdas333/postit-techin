import {createContext, useState, useEffect } from "react";
import Authentication from "./AuthService.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(Authentication.isAuthenticated());
    const [currentUser, setCurrentUser] = useState(Authentication.getCurrentUser());
    const [roles, setRoles] = useState(Authentication.getRoles());

    useEffect(() => {
        setIsAuthenticated(Authentication.isAuthenticated());
        setCurrentUser(Authentication.getCurrentUser());
        setRoles(Authentication.getRoles());
    }, []);

    const login = (username, password) => {
        return Authentication.login(username, password).then(user => {
            setIsAuthenticated(true);
            setCurrentUser(Authentication.getCurrentUser());
            setRoles(Authentication.getRoles());
        });
    };

    const logout = () => {
        Authentication.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setRoles([]);
    }

    const hasRole = (role) => {
        return roles.includes(role);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated , currentUser, login, logout, roles, hasRole}}>
            {children}
        </AuthContext.Provider>
    );
};
