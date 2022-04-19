import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { RenderCbLab, BasicTextFields, RadioButtonsGroup } from './renderFilter';
import Box from '@mui/material/Box';

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
        sx={{ '&>div':{padding:"20px"} }}
    >
        <Box component="div">
            <BasicTextFields />
        </Box>
        <Box component="div">
            <RenderCbLab />
        </Box>
        <Box component="div">
            <RadioButtonsGroup />
        </Box>
    </Menu>)
}
