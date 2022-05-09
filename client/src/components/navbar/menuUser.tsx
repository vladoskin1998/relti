import React, {useContext} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../ui/modal';
import { useNavigate } from "react-router-dom";
import { AUTH } from '../../enum/enum'
import { apiAuth } from '../../api/api'
import { useDispatch } from 'react-redux';
import Context from '../../context/context';
import { ALERT } from '../../enum/enum'

export default function MenuUser({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    const navigation = useNavigate()
    const dispatch = useDispatch()

    const { setAlert } = useContext(Context)

    const singIn = () => {
        navigation('/auth', { state: { auth: AUTH.LOGIN } })
        handleMenuClose()
    }

    const singUp = () => {
        navigation('/auth', { state: { auth: AUTH.REGISTRATION } })
        handleMenuClose()
    }

    const exit = () => {
        navigation('/', { state: { auth: AUTH.LOGIN } })
        dispatch({ type: "AUTH_DELETE" })
        apiAuth.post('/logout')
            .then(res => console.log())
            .catch(e => setAlert({status: ALERT.SUCCESS, message: "You exit in profile"}))

        handleMenuClose()
    }

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
    >
        <MenuItem onClick={singIn}>Sing in</MenuItem>
        <MenuItem onClick={singUp}>Sing up</MenuItem>
        <MenuItem onClick={exit}>Exit</MenuItem>
    </Modal>
    )
}
