import React, { ReactElement } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";

export default function InputPost(): ReactElement {

    const { city, street, address, price } = useSelector((state: RootState) => state.AddPost)

    const dispatch = useDispatch()

    const handlerInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, t: string) => {
        dispatch({ type: t, payload: e.target.value })
    }

    return (
        <>
            <TextField value={city} onChange={e => handlerInput(e, "AP__CITY")} label="SITY" variant="outlined" />
            <TextField value={street} onChange={e => handlerInput(e, "AP__STREET")} label="STREET" variant="outlined" />
            <TextField value={address} onChange={e => handlerInput(e, "AP__ADDRESS")} label="ADDRESS" variant="outlined" />
            <TextField value={price} onChange={e => handlerInput(e, "AP__PRICE")} label="PRICE" variant="outlined" />
        </>
    );
}