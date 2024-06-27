import {useContext, useState} from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const handleAddBook = () => {
       navigate("add/advertisement");
    };
    const handleAddCategory = () => {
        navigate("category/add")
    };
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Post it
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/home')}>Home</Button>
                    <Button color="inherit" onClick={handleAddBook}>Add Advertisement</Button>
                    <Button color="inherit" onClick={handleAddCategory}>Add Category</Button>
                    <Button color="inherit" onClick={() => navigate("category/all")}>Categories</Button>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;

