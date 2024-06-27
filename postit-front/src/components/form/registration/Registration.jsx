import React, { useState } from "react";
import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";
import AuthService from "../../utils/AuthService.js";
import {useNavigate} from "react-router-dom";


function Registration() {

    const [form, setForm] = useState({ username: "", password: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.password !== confirmPassword) {
            alert('Passwords do not match!');
        } else {
            try {
                const response = await axios
                    .post("http://localhost:8080/api/auth/register", form)
                        AuthService.addToken(response);
                        setMessage("User registered successfully");
                        setIsError(false);
                        navigate('/home');
            } catch (error) {
                if(error.response.status === 409){
                    setIsError(true);
                    setMessage("User with this username already exists")
                }

                else {
                    setMessage("An error occurred during the registration.");
                    setIsError(true);
                }
            }
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Grid container justify="center">
            <Paper style={{ padding: 16 }}>
                <Typography
                    variant="body2"
                    style={{
                        color: isError ? 'red' : 'green',
                        marginTop: '1em'
                    }}
                >
                    {message}
                </Typography>
                <Typography variant="h4">Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        value={form.username}
                        onChange={handleChange}
                        name="username"
                        type="text"
                        label="Username"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        label="Password"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: 16 }}
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default Registration;