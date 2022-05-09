import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const avatar = require('./avatar.png');

export default function About() {
    return (
        <div className='about'>
            <img src={avatar} alt="" />
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h5" gutterBottom component="div">
                    NATARELTI
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    Natalia Ryabenko
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    contact: 380000000000, 380000000000
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    mail: mail@mail.com
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    telegram: @telegram
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    instagram: _instagram
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                text text text text text text textvvv textvvvv text textv text
                text textv text
                </Typography>
                <Typography variant="body1" gutterBottom>
                    text text text text text text text text text text text
                    text textv text text text text text text text text
                    text text textv text text text text textv
                    text textvvvv text text text textv text
                    textv textv text text
                    textv text text text text
                </Typography>
            </Box>
        </div>

    );
}
