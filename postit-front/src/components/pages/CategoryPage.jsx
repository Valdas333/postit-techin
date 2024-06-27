import { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axiosInstance from "../utils/axiosInstance.jsx";

const CategoryPage = () =>{
    const [category, setCategory] = useState({
        name: "",
    });
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {
        setCategory({...category, name: e.target.value});
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/category/add', category);
            console.log('Category submitted:', response.data);
            setOpen(true);
            setCategory({
                name: '',
            });
        } catch (error) {
            console.error('There was an error submitting the category!', error);
        }
    };
    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{mt: 4}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Add New Category
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="Category"
                                    label="Category"
                                    fullWidth
                                    variant="outlined"
                                    value={category.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Category successfully added!
                        </Alert>
                    </Snackbar>
                </Box>
            </Container>
        </div>
    );
}

export default CategoryPage;