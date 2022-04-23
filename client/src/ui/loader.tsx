import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <Box className="loader__body">
            <Box className="loader">Loading...</Box>
        </Box>
    );
}
