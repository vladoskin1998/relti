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
import { RootState } from '../../store/store';
import { OPTIONS, SELECT } from '../../enum/enum'
import { RentOrBuyType, SelectType } from '../../types/types'

export function RenderCbLab() {

    const dispatch = useDispatch()
    const { rentOrBuy } = useSelector((state: RootState) => state.changeFilter)

    const changeRentBuy = (rb: RentOrBuyType) => {
        dispatch({ type: "F_CHANGE_RENTBUY", payload: rb })
    }

    console.log(SELECT);


    return (
        <FormGroup>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <FormControlLabel control={<Checkbox checked={rentOrBuy.includes(OPTIONS.RENT)} onChange={() => changeRentBuy(OPTIONS.RENT)} />} label="Buy" />
            <FormControlLabel control={<Checkbox checked={rentOrBuy.includes(OPTIONS.BUY)} onChange={() => changeRentBuy(OPTIONS.BUY)} />} label="Rent" />
        </FormGroup>
    );
}

export function BasicTextFields() {

    const dispatch = useDispatch()

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch({ type: "F_CHANGE_MINPRICE", payload: minPrice })
        }, 1500)
        return () => clearTimeout(timer)
    }, [minPrice])


    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch({ type: "F_CHANGE_MAXPRICE", payload: maxPrice })
        }, 1500)
        return () => clearTimeout(timer)
    }, [maxPrice])


    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="min price" variant="outlined" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <TextField id="outlined-basic" label="max price" variant="outlined" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </Box>
        </FormControl>
    );
}

export function RadioButtonsGroup() {

    const dispatch = useDispatch()

    const { select } = useSelector((state: RootState) => state.changeFilter)

    const changeSelect = (sel:SelectType) => {
        dispatch({ type: "F_CHANGE_SELECT", payload: sel })
    }

    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel  control={<Radio checked={select === SELECT.END} onChange={() => changeSelect(SELECT.END)}/>} label="ENDDate" />
                <FormControlLabel  control={<Radio checked={select === SELECT.START} onChange={() => changeSelect(SELECT.START)}/>} label="STARTDate" />
                <FormControlLabel  control={<Radio checked={select === SELECT.ASC} onChange={() => changeSelect(SELECT.ASC)}/>} label="Asc" />
                <FormControlLabel  control={<Radio checked={select === SELECT.DESC} onChange={() => changeSelect(SELECT.DESC)}/>} label="Desc" />
            </RadioGroup>
        </FormControl>
    );
}
