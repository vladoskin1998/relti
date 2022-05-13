import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { NavigationStateInterface } from '../../types/types'
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import { baseURL } from '../../config'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ItemScreen() {

    const location = useLocation()
    const state = location.state as NavigationStateInterface;

    const navigation = useNavigate()


    return (
        <Box className='modal'>
            <IconButton size="large" className='modal__close' onClick={() => navigation(-1)}>
                <CloseIcon />
            </IconButton>
            {state?.images.map((image, index) =>
                <Box key={image + index}>
                    <CardMedia
                        component="img"
                        image={`${baseURL}/images/${image}`}
                        alt="Not found images"
                    />
                </Box>
            )}
        </Box>
    )

}