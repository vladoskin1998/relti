import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Modal from '../../ui/modal';

export default function RenderMenuUser({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
    >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Modal>
    )
}
