import React, {useState} from "react";
import axiosInstance from "../utils/axiosInstance.jsx";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from "@mui/material";

const CategoryPage = () =>{
    const [category, setCategory] = useState({
        name: "",
    });

    const handleChange = (e) => {
        setCategory({...category, name: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/category/add', category);
            console.log('Category submitted:', response.data);
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
                </Box>
            </Container>
        </div>
    );
}

export default CategoryPage;