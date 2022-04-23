import React, { ReactElement, ReactNode } from 'react';
import Menu from '@mui/material/Menu';
import { SxProps } from '@mui/system';

export default function Modal({
    anchorEl,
    handleMenuClose,
    children,
    sx,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
    children?: ReactNode,
    sx?:SxProps
}): ReactElement {

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
        sx={sx}
    >
        {children}
    </Menu>)
}
