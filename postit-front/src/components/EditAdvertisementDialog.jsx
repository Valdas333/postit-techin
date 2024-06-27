import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import axiosInstance from './utils/axiosInstance.jsx';

const EditAdvertisementDialog = ({ advertisement, open, onClose }) => {
    const [localAdvertisement, setLocalAdvertisement] = useState({
        title: '', description: '', city: '', price: '', category: { id: '', name: '' } });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (advertisement) {
            setLocalAdvertisement({
                ...advertisement,
                category: advertisement.category || { id: '', name: '' }
            });
        }
    }, [advertisement]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/category');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedAdvertisement = {
                ...localAdvertisement,
                category: localAdvertisement.category.id
            };
            await axiosInstance.put(`api/edit/advertisement/${localAdvertisement.id}`, updatedAdvertisement);

            window.location.reload();
            console.log('Advertisement updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating advertisement:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category') {
            setLocalAdvertisement((prevState) => ({
                ...prevState,
                category: categories.find(cat => cat.id === value) || { id: '', name: '' },
            }));
        } else {
            setLocalAdvertisement((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={localAdvertisement.title || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={localAdvertisement.description || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        value={localAdvertisement.city || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={localAdvertisement.price || ''}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            name="category"
                            value={localAdvertisement.category.id || ''}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditAdvertisementDialog;
