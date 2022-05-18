import React, { ReactElement, useState } from "react";
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { VInputNewPostInterface, KeyNewPostType } from '../../types/types';
import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material/Select';
import { CURRENCY } from '../../enum/enum'
import { SelectChange } from '../navbar/filter/filter-items'

export default function SecondLine(): ReactElement {

    const { storey, numberOfStoreys, square, price, currency } = useSelector((state: RootState) => state.AddPost)
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
            <TextField value={numberOfStoreys} onChange={e => handlerInput(e, "AP__NUM__STOREYS")}
                //      onBlur={() => handlerValidate('city', !city)}
                helperText="Не обязательное поле"
                label="Этажность"
                variant="outlined"
                error={validInput.city}
                type="number"
            />
            <TextField value={storey} onChange={e => handlerInput(e, "AP__STOREYS")}
                //    onBlur={() => handlerValidate('street', !street)}
                helperText="Не обязательное поле"
                label="Этаж"
                variant="outlined"
                error={validInput.street}
                type="number"
            />
            <TextField value={square} onChange={e => handlerInput(e, "AP__SQUARE")}
                //      onBlur={() => handlerValidate('address', !address)}
                helperText="Обязательное поле"
                label={<>Площадь, м<sup>2</sup></>}
                variant="outlined"
                error={validInput.address}
                type="number"
            />
            <Box className="add__input-price">
                <TextField value={price} onChange={e => handlerInput(e, "AP__PRICE")}
                    onBlur={() => handlerValidate('price', !price)}
                    helperText="Обязательное поле"
                    label="Цена"
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