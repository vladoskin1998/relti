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

    const handlerNav = (r:string) => {
        return () => {
            handleMenuClose()
            navigation(r) 
        }
        
    }

    return (<Modal anchorEl={anchorEl} handleMenuClose={handleMenuClose} >
        <MenuItem onClick={handlerNav('/')}>Главная</MenuItem>
        <MenuItem onClick={handlerNav('/about')}>Контакты</MenuItem>
        <MenuItem onClick={handlerNav('/send')}>Почта</MenuItem>
    </Modal>
    )
}
