import { Box, CircularProgress, Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import axiosInstance from './utils/axiosInstance.jsx';
import { useEffect, useState } from 'react';
import EditAdvertisementDialog from './EditAdvertisementDialog.jsx';

const AdvertisementList = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
    const [needRefresh, setNeedRefresh] = useState(false);
    const onEdit = (advertisement) => {
        setSelectedAdvertisement(advertisement);
    };

    const handleEditDialogClose = () => {
        setSelectedAdvertisement(null);
    };

    useEffect(() => {
        let isMounted = true;
        const fetchAdvertisements = async () => {
            try {
                const response = await axiosInstance.get('api/advertisements');
                if (isMounted) {
                    setAdvertisements(response.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching advertisements:', error);
                    setLoading(false);
                }
            }
        };

        fetchAdvertisements();

        return () => {
            isMounted = false;
        };
    }, []);

    const deleteAdvertisement = async (id) => {
        try {
            const response = await axiosInstance.delete(`api/delete/advertisement/${id}`);
            if (response.data === `Advertisement deleted successfully`) {
                console.log(response.data);
                setNeedRefresh(prevState => !prevState);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error('Error while deleting advertisement:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Grid container spacing={2}>
                {advertisements.map((advertisement) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} key={advertisement.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title={advertisement.title} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {advertisement.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {advertisement.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    City: {advertisement.city}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {advertisement.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => onEdit(advertisement)}>Edit</Button>
                                <Button size="small" onClick={() => deleteAdvertisement(advertisement.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedAdvertisement && (
                <EditAdvertisementDialog
                    open={Boolean(selectedAdvertisement)}
                    onClose={handleEditDialogClose}
                    advertisement={selectedAdvertisement}
                />
            )}
        </Container>
    );
};

export default AdvertisementList;
