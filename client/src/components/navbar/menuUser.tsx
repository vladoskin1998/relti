import React, {useContext} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../ui/modal';
import { useNavigate } from "react-router-dom";
import { AUTH } from '../../enum/enum'
import { apiAuth } from '../../api/api'
import { useDispatch } from 'react-redux';
import Context from '../../context/context';
import { ALERT } from '../../enum/enum'
import { AuthType } from '../../types/types'

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

    const handlerMenu = (s: {auth: AuthType}) => {
        return () => {
            handleMenuClose()
            navigation('/auth', { state: s })
        }
    }

    const exit = () => {
        handleMenuClose()
        navigation('/')
        dispatch({ type: "AUTH_DELETE" })
        apiAuth.post('/logout')
            .catch(e => setAlert({status: ALERT.SUCCESS, message: "You exit in profile"}))
    }

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
    >
        <MenuItem onClick={handlerMenu({ auth: AUTH.LOGIN })}>Вход</MenuItem>
        <MenuItem onClick={handlerMenu({ auth: AUTH.REGISTRATION })}>Регистрация</MenuItem>
        <MenuItem onClick={exit}>Выход</MenuItem>
    </Modal>
    )
}
