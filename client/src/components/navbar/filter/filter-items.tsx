import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store';
import { OPTIONS, SELECT, CURRENCY } from '../../../enum/enum';
import { RentOrBuyType, SelectType, CurrencyType } from '../../../types/types';
import { useDelayInput } from '../../../hooks/useDelayInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function RenderCbLab() {

    const dispatch = useDispatch()
    const { rentOrBuy } = useSelector((state: RootState) => state.ChangeFilter)

    const changeRentBuy = (rb: RentOrBuyType) => {
        dispatch({ type: "F_CHANGE_RENTBUY", payload: rb })
    }

    return (
        <FormControl>
            <FormGroup>
                <FormLabel id="checkbox">Gender</FormLabel>
                <FormControlLabel aria-labelledby="checkbox" control={<Checkbox checked={rentOrBuy.includes(OPTIONS.RENT)} onChange={() => changeRentBuy(OPTIONS.RENT)} />} label="Rent" />
                <FormControlLabel aria-labelledby="checkbox" control={<Checkbox checked={rentOrBuy.includes(OPTIONS.BUY)} onChange={() => changeRentBuy(OPTIONS.BUY)} />} label="Buy" />
            </FormGroup>
        </FormControl>
    );
}

export function BasicTextFields() {

    const [minPrice, setMinPrice] = useDelayInput("F_CHANGE_MINPRICE")
    const [maxPrice, setMaxPrice] = useDelayInput("F_CHANGE_MAXPRICE")

    const select: CurrencyType[] = [CURRENCY.UAH, CURRENCY.USD, CURRENCY.EUR]

    const dispatch = useDispatch()

    const { currency } = useSelector((state: RootState) => state.ChangeFilter)

    const handlerInput = (e: SelectChangeEvent, t: string) => {
        dispatch({ type: t, payload: e.target.value })
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <Box component="form" className="filter__price">
                <TextField type="number" id="outlined-basic" label="min price" variant="outlined" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <TextField type="number" id="outlined-basic" label="max price" variant="outlined" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <SelectChange currency={currency} handlerInput={e => handlerInput(e, "F_CHANGE_CURRENCY")} item={select} />
            </Box>
        </FormControl>
    );
}

export function RadioButtonsGroup() {

    const dispatch = useDispatch()

    const { select } = useSelector((state: RootState) => state.ChangeFilter)

    const changeSelect = (sel: SelectType) => {
        dispatch({ type: "F_CHANGE_SELECT", payload: sel })
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                <FormControlLabel control={<Radio checked={select === SELECT.END} onChange={() => changeSelect(SELECT.END)} />} label="ENDDate" />
                <FormControlLabel control={<Radio checked={select === SELECT.START} onChange={() => changeSelect(SELECT.START)} />} label="STARTDate" />
                <FormControlLabel control={<Radio checked={select === SELECT.ASC} onChange={() => changeSelect(SELECT.ASC)} />} label="Asc" />
                <FormControlLabel control={<Radio checked={select === SELECT.DESC} onChange={() => changeSelect(SELECT.DESC)} />} label="Desc" />
            </RadioGroup>
        </FormControl>
    );
}

export function SelectChange({
    item,
    currency,
    handlerInput,
}: {
    item: CurrencyType[],
    currency: CurrencyType,
    handlerInput: (e: SelectChangeEvent, t: string) => void,
}) {
    return (
        <Select value={currency}
            onChange={(e) => handlerInput(e, "AP__CURRENCY")}
            displayEmpty
            defaultValue={CURRENCY.UAH}
        >
            {
                item.map(it => <MenuItem value={it} key={it}>{it}</MenuItem>)
            }
        </Select>
    )
}







