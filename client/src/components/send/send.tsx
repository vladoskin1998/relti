import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { api } from '../../api/api'
import Context from '../../context/context';
import { ALERT } from '../../enum/enum';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Send() {

    const [message, setMessage] = useState('')
    const { setAlert, setLoader } = useContext(Context)
    const [files, setFiles] = useState(null)

    const send = () => {
        setLoader(true)
        let formData = new FormData()

        if(files){
            if(files[0].size > 5000000){
                setAlert({status: ALERT.ERROR, message: "fail have contain less 5Mb" })
                setFiles(null)
                return
            }
            formData.append("file", files[0])
        }

       

        formData.append("message", message)

        api.post('/mail/send', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                setAlert({status: ALERT.SUCCESS, message: "send mail success" })
                setMessage('')
                setFiles(null)
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
            });
    }

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
                placeholder="Your message"
                className='add__text-area'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Box component="div" sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                {
                    files
                        ? <Box className='send__file' color="#1976d2">
                            <FilePresentIcon />
                            {files[0].name.length > 15 ? `${files[0].name.substring(0,15)}...` : files[0].name}
                            <Button variant="text" color="error" onClick={() => setFiles(null)}>
                                <DeleteIcon />
                            </Button>
                        </Box>
                        : <Button>
                            <label htmlFor="myfile" className='send__attach'>
                                <AttachFileIcon />
                                Attach File
                            </label>
                        </Button>
                }
                <input type="file" id="myfile" name="myfile" onChange={e => setFiles(e.target.files)} />
                <Button variant="contained" onClick={send}>Send</Button>
            </Box>
        </Box>
    );
}
