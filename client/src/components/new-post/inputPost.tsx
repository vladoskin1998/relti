import React, { ReactElement, useState } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { VInputNewPostInterface, KeyNewPostType } from '../../types/types';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { CURRENCY } from '../../enum/enum'
import { SelectChange } from '../navbar/filter/filter-items'

export default function InputPost(): ReactElement {

    const { city, street, address, price, currency } = useSelector((state: RootState) => state.AddPost)
    const select = [CURRENCY.UAH, CURRENCY.USD, CURRENCY.EUR]

    const [validInput, setValidInput] = useState<VInputNewPostInterface>({
        city: false,
        street: false,
        address: false,
        price: false
    })

    const dispatch = useDispatch()

    const handlerInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent, t: string) => {
        dispatch({ type: t, payload: e.target.value })
    }

    const handlerValidate = (key: KeyNewPostType, value: boolean) => {
        setValidInput(s => ({ ...s, [key]: value }))
    }

    return (
        <>
            <TextField value={city} onChange={e => handlerInput(e, "AP__CITY")}
                onBlur={() => handlerValidate('city', !city)}
                helperText={validInput.city ? "Incorrect entry." : "Input city"}
                label="CITY"
                variant="outlined"
                error={validInput.city}
            />
            <TextField value={street} onChange={e => handlerInput(e, "AP__STREET")}
                onBlur={() => handlerValidate('street', !street)}
                helperText={validInput.street ? "Incorrect entry." : "Input street"}
                label="STREET"
                variant="outlined"
                error={validInput.street}
            />
            <TextField value={address} onChange={e => handlerInput(e, "AP__ADDRESS")}
                onBlur={() => handlerValidate('address', !address)}
                helperText={validInput.address ? "Incorrect entry." : "Input address"}
                label="ADDRESS"
                variant="outlined"
                error={validInput.address}
            />
            <Box className="add__input-price">
                <TextField value={price} onChange={e => handlerInput(e, "AP__PRICE")}
                    onBlur={() => handlerValidate('price', !price)}
                    helperText={validInput.price ? "Incorrect entry." : "Input price"}
                    label="PRICE"
                    variant="outlined"
                    error={validInput.price}
                    type="number"
                />
                <Box sx={{ height: 56 }}>
                    <SelectChange currency={currency}
                        handlerInput={handlerInput}
                        item={select}
                    />
                </Box>
            </Box>
        </>
    );
}