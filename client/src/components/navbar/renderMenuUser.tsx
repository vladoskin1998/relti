import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function RenderMenuUser({
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
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>)
}
