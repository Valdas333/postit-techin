import { Box, CircularProgress, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import axiosInstance from './utils/axiosInstance.jsx';
import { useEffect, useState } from 'react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/api/category/all');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories: ', error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                All Categories
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {category.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {category.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryList;
