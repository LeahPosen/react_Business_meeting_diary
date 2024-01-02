import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import service from '../../data/service ';
import { CloseContext } from './AdminHome';
import Box from '@mui/material/Box';
import IconButton from '@mui/joy/IconButton';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

const ServiceForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const setCloseContext = useContext(CloseContext).setAnchorElUser;
    const addService = async (data) => {
        try {
            const status = await service.postService(data);
            console.log(status);
            reset();
            setCloseContext(null);

        } catch (error) {
            reset();
        }
    };


    const inputStyle = {
        width: '25ch',
        height: '3rem', // גובה חדש ל-Input
        marginBottom: '1rem', // מרווח בין ה-Inputs
    };

    return (
        <form onSubmit={handleSubmit(addService)}>
            <Box
                sx={{
                    '& .MuiTextField-root': {
                        m: 0.75,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    },
                }}
            >
                <FormControl sx={inputStyle}>
                    <FormLabel>Name:</FormLabel>
                    <Input id="outlined-textarea" label="Name"  {...register('name')} />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <FormLabel>Description:</FormLabel>
                    <Input
                        id="outlined-textarea"
                        label="Description"

                        {...register('description')}
                    />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <FormLabel>Price:</FormLabel>
                    <Input id="outlined-textarea" label="Price"  {...register('price')} type="number" />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <FormLabel>Duration:</FormLabel>
                    <Input id="outlined-textarea" type="number" label="duration" {...register('duration')} />
                </FormControl>
                <FormControl sx={inputStyle}>
                    <FormLabel>Image:</FormLabel>
                    <Input id="outlined-textarea" label="image"  {...register('image')} />
                </FormControl>
                <br /><br />
                <IconButton
                    type='submit'
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    sx={{
                        backgroundColor: '#77474b',
                        '&:hover': {
                            backgroundColor: '#202123',
                        }, 
                        position: 'absolute',
                        borderRadius: '50%',
                        right: '7rem',
                        bottom: 0,
                    }}
                >
                    <PlaylistAddCheckIcon />
                </IconButton>
            </Box>
        </form>
    );
};

export default ServiceForm;










