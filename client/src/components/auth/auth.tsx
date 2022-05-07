import React, { useState, useEffect } from 'react'
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
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH, ERRORAUTH } from '../../enum/enum'
import { AxiosResponse } from 'axios'
import { NavigationStateInterface, AuthResponseInterface, ErrorAuthType } from '../../types/types'
import { validate } from 'email-validator';
import {validPassword} from '../../actions/validatorPassword';

export default function Auth() {

    const dispatch = useDispatch()

    const location = useLocation()

    const state = location.state as NavigationStateInterface;

    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [showPas, setShowPass] = useState(false)
    const [validInput, setValidInput] = useState({
        login: false,
        password: false
    })

    useEffect(() => {
        setLogin('')
        setPassword('')
        setValidInput({ login: false, password: false })
    }, [state])

     console.log(validInput)

    const checkForm = (message: ErrorAuthType) => {
        console.log(message)
        switch (message) {
            case ERRORAUTH.LOGIN:
                setValidInput(s => ({ password: false, login: true }))
                break;
            case ERRORAUTH.PASSWORD:
                setValidInput(s => ({ login: false, password: true }))
                break;
            default:
                console.log("error")
                break;
        }
    }

    const registrationProfile = () => {

        let validateEmail = !validate(login)
        let validatePassword = !validPassword(password)

        setValidInput({
            login: validateEmail,
            password: validatePassword
        })

        if(validateEmail || validatePassword){
            return
        }

        apiAuth.post('/registration', {
            login, password
        })
            .then((res: AxiosResponse<AuthResponseInterface>) => {
                navigate(state?.from?.pathname || '/')
                dispatch({ type: "AUTH_UPDATE", payload: res.data?.accessToken })
            })
            .catch(e => console.log("error", e?.message))
    }


    const loginProfile = () => {
        apiAuth.post('/login', {
            login, password
        })
            .then((res: AxiosResponse<AuthResponseInterface>) => {
                navigate(state?.from?.pathname || '/')
                dispatch({ type: "AUTH_UPDATE", payload: res.data?.accessToken })
            })
            .catch(e => {
                checkForm(e?.response?.data?.message)
            })
    }

    return <Box component="div" className="auth">
        <Typography variant="h4" component="div" gutterBottom>
            {
                state?.auth === AUTH.REGISTRATION
                    ? "Registration"
                    : "Login"

            }
        </Typography>
        <Box className="auth__input">
            <TextField id="outlined-basic"
                label="Login"
                variant="outlined"
                value={login}
                onChange={e => setLogin(e.target.value)}
                error={validInput.login} 
                placeholder="mail@mail.com"
            />
            <FormControl sx={{ width: '300' }} variant="outlined" error={validInput.password}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPas ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="qwerty123"
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
                    error={validInput.password}
                />
            </FormControl>
        </Box>
        <Stack className='auth__button' spacing={2}>
            <Button variant="contained"
                onClick={
                    state?.auth === AUTH.REGISTRATION
                        ? registrationProfile
                        : loginProfile
                }
            >
                {
                    state?.auth === AUTH.REGISTRATION
                        ? "Registration"
                        : "Login"
                }
            </Button>
            <Button>Forgot password</Button>
        </Stack>
    </Box>
}





