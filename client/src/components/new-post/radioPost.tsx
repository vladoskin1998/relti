import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { OPTIONS } from '../../enum/enum'
import { RentOrBuyType } from '../../types/types'
import Box from '@mui/material/Box';

export default function RadioPost() {

    const { rentOrBuy } = useSelector((state: RootState) => state.AddPost)

    const dispatch = useDispatch()

    const hendlerRadio = (o: RentOrBuyType) => {
        return () => dispatch({ type: "AP_RENTORBUY", payload: o })
    }

    return (
        <Box>
            <RadioGroup>
                <FormControlLabel checked={rentOrBuy === OPTIONS.RENT} onChange={hendlerRadio(OPTIONS.RENT)} control={<Radio />} label="RENT" />
                <FormControlLabel checked={rentOrBuy === OPTIONS.BUY} onChange={hendlerRadio(OPTIONS.BUY)} control={<Radio />} label="BUY" />
            </RadioGroup>
        </Box>

    );
}
