import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { apiAuth } from '../../api/api'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH } from '../../enum/enum'
import { NavigationStateInterface } from '../../types/types'


export default function Auth() {



    const dispatch = useDispatch()

    const location = useLocation()

    const state = location.state as NavigationStateInterface;

    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showPas, setShowPass] = useState(false)

    const registrationProfile = () => {
        apiAuth.post('/registration', {
            login, password
        })
            .then(res => {
                navigate(state?.from?.pathname)
                dispatch({ type: "AUTH_UPDATE", payload: res.data.accessToken })
            })
            .catch(e => console.log(e))
    }


    const loginProfile = () => {
        apiAuth.post('/login', {
            login, password
        })
            .then(res => {
                navigate(state?.from?.pathname)
                dispatch({ type: "AUTH_UPDATE", payload: res.data.accessToken })
            })
            .catch(e => console.log(e))
    }

    return <Box component="div" className="auth">
        <Typography variant="h4" component="div" gutterBottom>
            {
                state?.auth === AUTH.SINGUP
                    ? "Registration"
                    : "Login"

            }
        </Typography>
        <Box className="auth__input">
            <TextField id="outlined-basic" label="Login" variant="outlined" value={login} onChange={e => setLogin(e.target.value)} />
            <FormControl sx={{ width: '300' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPas ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPass(s => !s)}
                                edge="end"
                            >
                                {showPas ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </Box>
        <Stack className='auth__button' spacing={2}>
            <Button variant="contained"
                onClick={
                    state?.auth === AUTH.SINGUP
                        ? registrationProfile
                        : loginProfile
                }
            >
                {
                    state?.auth === AUTH.SINGUP
                        ? "Registration"
                        : "Login"
                }
            </Button>
            <Button>Forgot password</Button>
        </Stack>
    </Box>
}





