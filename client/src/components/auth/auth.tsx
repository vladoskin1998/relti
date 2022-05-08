import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { apiAuth, api } from '../../api/api'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH, ERRORAUTH, ALERT } from '../../enum/enum'
import { AxiosResponse } from 'axios'
import { NavigationStateInterface, AuthResponseInterface, ErrorAuthType, AuthType } from '../../types/types'
import { validate } from 'email-validator';
import { validPassword } from '../../actions/validatorPassword';
import InputPassword from './inputPassword';
import Context from '../../context/context';

export default function Auth() {

    const dispatch = useDispatch()

    const location = useLocation()
    const navigation = useNavigate()

    const state = location.state as NavigationStateInterface;

    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [validInput, setValidInput] = useState({
        login: false,
        password: false
    })

    const { setAlert } = useContext(Context)

    useEffect(() => {
        setLogin('')
        setPassword('')
        setValidInput({ login: false, password: false })
        setNewPassword('')
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
 //////////////new function
        let validateEmail = !validate(login)
        let validatePassword = !validPassword(password)

        setValidInput({
            login: validateEmail,
            password: validatePassword
        })

        if (validateEmail || validatePassword) {
            return
        }

        apiAuth.post('/registration', {
            login, password
        })
            .then((res: AxiosResponse<AuthResponseInterface>) => {
                navigate(state?.from?.pathname || '/')
                dispatch({ type: "AUTH_UPDATE", payload: res.data?.accessToken })
                setAlert({status: ALERT.SUCCESS, message: "You login as user"})
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
                setAlert({status: ALERT.SUCCESS, message:"You login as user"})
            })
            .catch(e => {
                checkForm(e?.response?.data?.message)
            })
    }

    const changePassword = () => {

        //////////////new function
        let validateEmail = !validate(login)
        let validatePassword = !(validPassword(password) || password === newPassword)

        setValidInput({
            login: validateEmail,
            password: validatePassword
        })

        if (validateEmail || validatePassword) {
            return
        }


        api.post('mail/change-password', {
            login, password
        })
            .then(() => {
                console.log("SEND CHANGE PASSWORD")
            })
            .catch(e => {
               
            })
    }

    const caseHandler = (a: AuthType) => {
        switch (a) {
            case AUTH.LOGIN:
                loginProfile()
                break;
            case AUTH.REGISTRATION:
                registrationProfile()
                break;
            case AUTH.CHANGE_PASSWORD:
                changePassword()
                break;
            default:
                console.log("error")
                break;
        }
    }

    return <Box component="div" className="auth">
        <Typography variant="h4" component="div" gutterBottom>
            {state?.auth}
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
            <InputPassword
                password={password}
                setPassword={setPassword}
                valid={validInput.password}
                label={state?.auth === AUTH.CHANGE_PASSWORD ? "New password" : "Password"}
            />
            {
                state?.auth === AUTH.CHANGE_PASSWORD
                    ? <InputPassword
                        password={newPassword}
                        setPassword={setNewPassword}
                        valid={validInput.password}
                        label={"Repeat password"}
                    />
                    : <></>
            }
        </Box>
        <Stack className='auth__button' spacing={2}>
            <Button variant="contained"
                onClick={() => caseHandler(state?.auth)}
            >
                {state?.auth}
            </Button>
            {
                state?.auth === AUTH.LOGIN
                    ? <Button onClick={() => navigation('/auth', { state: { auth: AUTH.CHANGE_PASSWORD } })}>
                        Forgot password
                    </Button>
                    : <></>
            }
        </Stack>
    </Box>
}





