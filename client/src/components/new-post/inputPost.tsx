import React, { ReactElement, useState } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { VInputNewPostInterface, KeyNewPostType } from '../../types/types';

export default function InputPost(): ReactElement {

    const { city, street, address, price } = useSelector((state: RootState) => state.AddPost)

    const [validInput, setValidInput] = useState<VInputNewPostInterface>({
        city: false,
        street: false,
        address: false,
        price: false
    })


    const dispatch = useDispatch()

    const handlerInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, t: string) => {
        dispatch({ type: t, payload: e.target.value })
    }

    const handlerValidate = (key: KeyNewPostType, value: boolean) => {
        setValidInput(s => ({ ...s, [key]: value }))
    }

    return (
        <>
            <TextField value={city} onChange={e => handlerInput(e, "AP__CITY")}
                onBlur={() => handlerValidate('city', !city)}
                helperText={validInput.city && "Incorrect entry."}
                label="SITY"
                variant="outlined"
                error={validInput.city}
            />
            <TextField value={street} onChange={e => handlerInput(e, "AP__STREET")}
                onBlur={() => handlerValidate('street', !street)}
                helperText={validInput.street && "Incorrect entry."}
                label="STREET"
                variant="outlined"
                error={validInput.street}
            />
            <TextField value={address} onChange={e => handlerInput(e, "AP__ADDRESS")}
                onBlur={() => handlerValidate('address', !address)}
                helperText={validInput.address && "Incorrect entry."}
                label="ADDRESS"
                variant="outlined"
                error={validInput.address}
            />
            <TextField value={price} onChange={e => handlerInput(e, "AP__PRICE")}
                onBlur={() => handlerValidate('price', !price)}
                helperText={validInput.price && "Incorrect entry."}
                label="PRICE"
                variant="outlined"
                error={validInput.price}
                type="number"
            />
        </>
    );
}