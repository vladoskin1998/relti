import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../ui/modal';
import { useNavigate } from "react-router-dom";
import { AUTH } from '../../enum/enum'

export default function RenderMenuUser({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    const navigation = useNavigate()

    const singIn = () => {
        navigation('/auth', {state : {auth: AUTH.SINGIN}})
        handleMenuClose()
    }

    const singUp = () => {
        navigation('/auth', {state : {auth: AUTH.SINGUP}})
          handleMenuClose()
    }

    const exit = () => {
        navigation('/auth', {state : {auth: AUTH.SINGIN}})
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