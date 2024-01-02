import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { IsAdminContext } from '../../App';
import { useContext } from 'react';
import { Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { transaction } from 'mobx';

export default function Login() {
    const [isLoading, setIsLoading] = React.useState(false);
    const setIsAdmin = useContext(IsAdminContext).setIsAdmin;
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [showPassword, setShowPassword] = React.useState(false);
    const [right, setRight] = React.useState(true);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    function checkLogin(data) {
        axios.post('http://localhost:8787/login', {
            name: data.name,
            password: data.password
        }).then((res) => {
            console.log(data);
            setIsAdmin(true);
            setIsLoading(true);
            setTimeout(() => {
                navigate("/admin");
            }, 2000);
        }).catch((error) => {
            reset();
            setRight(false);
        })
    }

    return (<>
        {!isLoading &&  <Box
            sx={{
                backgroundImage: `url('src/commponents/image/login.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '101.5vw',
                height: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowX: 'hidden',
                transform: 'translate(-10vw, 0)'            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    maxWidth: '70%', 
                    overflow: 'hidden', 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    transform: 'translate(-30vw, 0)' 
                }}
            >
                <FormControl onSubmit={handleSubmit(checkLogin)}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' }, display: 'flex', flexWrap: 'wrap',
                            flexDirection: "column"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-textarea"
                                label="Name*"
                                placeholder="Enter your name"
                                multiline
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register("password")}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            {!right && (
                                <Alert severity="error" sx={{ marginBottom: 2 }}>
                                    User name and password aren't corrected
                                </Alert>)}
                        </div>
                        <Button type="submit" variant="contained" sx={{
                            backgroundColor: '#77474b',
                            '&:hover': {
                                backgroundColor: '#202123', 
                            }, }}>LOG IN</Button>
                    </Box>
                </FormControl>
            </Box> 
            </Box>}
            {isLoading && <Box sx={{ display: 'flex' }}>
            <CircularProgress sx={{ color: '#77474b', }}/>
            </Box>}</>
       );
}


