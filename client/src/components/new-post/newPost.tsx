import React, { ReactElement, useState } from "react";
import Textarea from './textArea';
import InputPost from './inputPost';
import RadioPost from './radioPost';
import ImageDND from './imageDnD'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { apiPost } from '../../api/api'
import { AxiosResponse } from 'axios'

export default function NewPost(): ReactElement {

    const post = useSelector((state: RootState) => state.AddPost)
    const [droppedFiles, setDroppedFiles] = useState([])
    const dispatch = useDispatch()

    const addPost = () => {

        const postJson = JSON.stringify(post)

        let formData = new FormData()

        if (droppedFiles) {
            droppedFiles.forEach((file: any) => formData.append(file.name, file))
        }

        formData.append("post", postJson)


        dispatch({ type: "LOADER", payload: true })
        apiPost.post('/add-post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((response: AxiosResponse<string>) => {
            setDroppedFiles([])
            dispatch({ type: 'AP_INETSTATE' })
            dispatch({ type: "LOADER", payload: false })
        })
            .catch(function (error) {
                console.log(error);
                dispatch({ type: "LOADER", payload: false })
            });
    }

    return (
        <div className="add">
            <Box component="div"
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    columnGap: "20px",
                    rowGap: "20px"
                }}
            >
                <InputPost />
                <Box>
                    <RadioPost />
                </Box>
                <Box>
                    <ImageDND droppedFiles={droppedFiles} setDroppedFiles={setDroppedFiles} />
                </Box>
                <Textarea />
                <Box className="add__button">
                    <Button variant="contained" onClick={addPost}>ADDNEWPOST</Button>
                </Box>
            </Box>
        </div>
    );
}

