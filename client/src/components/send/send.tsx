import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function Send() {

    return (
        <Box component="div" className="send">
            <Typography variant="h6" gutterBottom component="div">
                Text Mail
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur
            </Typography>
            <TextareaAutosize
                aria-label="minimum height"
                placeholder="Minimum 3 rows"
                className='add__text-area'
            />
            <Box component="div" sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <Button>
                    <AttachFileIcon />
                    Attach File
                </Button>
                <Button variant="contained">Send</Button>
            </Box>
        </Box>
    );
}
