import React, { ReactElement, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';

export default function InputPassword({
    password,
    setPassword,
    valid,
    label="password",
}:{
    password:string,
    setPassword:(s:string)=>void,
    valid:boolean,
    label?: string
}): ReactElement {

    const [showPas, setShowPass] = useState(false)

    return <FormControl sx={{ width: '300' }} variant="outlined" error={valid}>
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
            id="outlined-adornment-password"
            type={showPas ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="qwerty123"
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(s => !s)}
                        edge="end"
                    >
                        {showPas ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
            label="Password"
            error={valid}
        />
    </FormControl>
    
}