import {useContext} from "react";
import AuthService from "./utils/AuthService.js";
import {AuthContext} from "./utils/AuthContext.jsx";

const Unauthorized = () => {

    const {currentUser} = useContext(AuthContext);
    const handleLogout = () => {
       AuthService.logout();
    };
    const userRoles = AuthService.getRoles();
    console.log(userRoles);
    if (!currentUser) {
        return <div>Please login to access this page.</div>
    }

    return <div>Welcome! You are authenticated.
    <button onClick={handleLogout}>Logout</button></div>

};

export default Unauthorized;
