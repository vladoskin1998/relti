import * as React from 'react';
import { RenderCbLab, BasicTextFields, RadioButtonsGroup } from './filter-items';
import Box from '@mui/material/Box';
import Modal from '../../../ui/modal';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

export default function Filter({
    anchorEl,
    handleMenuClose,
}: {
    anchorEl: null | HTMLElement,
    handleMenuClose: () => void,
}) {

    const dispatch = useDispatch()

    return (<Modal
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        sx={{ '&>div': { padding: "20px" }, '& ul': { display: "flex", flexDirection: "column" } }}
    >
        <BasicTextFields />
        <RenderCbLab />
        <RadioButtonsGroup />
        <Box component="div" sx={{ display: "flex", justifyContent: "flex-end", columnGap: "20px" }}>
            <Button variant="outlined" onClick={() => { dispatch({ type: "F_CHANGE_DEFAULT" }) }}>Default</Button>
            <Button variant="contained" onClick={handleMenuClose}>Ok</Button>
        </Box>
    </Modal>)
}
