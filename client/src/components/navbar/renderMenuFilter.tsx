import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { RenderCbLab, BasicTextFields, RadioButtonsGroup } from './renderFilter';


export default function renderMenuFilter({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';

    return (<Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem sx={{ marginTop: '20px' }} autoFocus={false}>
            <BasicTextFields />
        </MenuItem>
        <MenuItem autoFocus={false}>
            <RenderCbLab />
        </MenuItem>
        <MenuItem autoFocus={false}>
            <RadioButtonsGroup />
        </MenuItem>
    </Menu>)
}
