import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Container,
    Typography,
    Grid,
} from '@mui/material';
import axiosInstance from '../utils/axiosInstance';

const AddAdvertisementPage = () => {
    const [advertisement, setAdvertisement] = useState({
        title: '',
        description: '',
        city: '',
        price: '',
        category: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/api/category/all');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdvertisement((prevAdvertisement) => ({
            ...prevAdvertisement,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('api/add/advertisement', advertisement);
            console.log('Advertisement submitted:', response.data);
            // Reset form
            setAdvertisement({
                title: '',
                description: '',
                city: '',
                price: '',
                category: '',
            });
        } catch (error) {
            console.error('There was an error submitting the advertisement!', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add New Advertisement
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                fullWidth
                                variant="outlined"
                                value={advertisement.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                value={advertisement.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="city"
                                label="City"
                                fullWidth
                                variant="outlined"
                                value={advertisement.city}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="price"
                                label="Price"
                                fullWidth
                                variant="outlined"
                                type="number"
                                value={advertisement.price}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={advertisement.category}
                                    onChange={handleChange}
                                    label="Category"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
    );
};

export default AddAdvertisementPage;


