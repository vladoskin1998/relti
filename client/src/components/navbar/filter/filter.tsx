import * as React from 'react';
import { RenderCbLab, BasicTextFields, RadioButtonsGroup } from './filter-items';
import Box from '@mui/material/Box';
import Modal from '../../../ui/modal';

export default function renderMenuFilter({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        sx={{ '&>div': { padding: "20px" } }}
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
    </Modal>)
}
