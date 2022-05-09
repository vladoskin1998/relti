import React, {useContext} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../ui/modal';
import { useNavigate } from "react-router-dom";

export default function MenuNavigation({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    const navigation = useNavigate()

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
    >
        <MenuItem onClick={() => navigation('/')}>Main</MenuItem>
        <MenuItem onClick={() => navigation('/about')}>About</MenuItem>
        <MenuItem onClick={() => navigation('/send')}>Mail</MenuItem>
    </Modal>
    )
}
