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
                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
            </Box>
        </div>

    );
}
