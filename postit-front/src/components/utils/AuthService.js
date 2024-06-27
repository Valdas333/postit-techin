import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = 'http://localhost:8080/api/auth';

class AuthService{
    login(username, password){
        return axios
            .post(`${API_URL}/authenticate`, {username, password})
            .then(response => {if (response.data.token){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data;
            });
    }

    logout(){
        localStorage.removeItem('user');
    }

    getCurrentUser(){
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? jwtDecode(user.token) : null;
    }

    isAuthenticated(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user) {
            return false;
        }
        const decodedToken = jwtDecode(user.token);
        const currentTime = Date.now() /1000;
        return decodedToken.exp > currentTime;
    }

    getRoles(){
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user){
            return [];
        }
        const decodedToken = jwtDecode(user.token);
        return decodedToken.roles || [];
    }
    getToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.token : null;
    }

    addToken(response){
        if(response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        } else {
            console.error("Provided token is null or undefined");
        }
    }
}

export default new AuthService();