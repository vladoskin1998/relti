import React, { ReactElement, useState, useContext } from "react";
import Textarea from './textArea';
import InputPost from './inputPost';
import RadioPost from './radioPost';
import ImageDND from './imageDnD'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { api } from '../../api/api'
import Context from '../../context/context';
import { ALERT } from '../../enum/enum';

export default function NewPost(): ReactElement {

    const [droppedFiles, setDroppedFiles] = useState([])
    const { setAlert } = useContext(Context)
    const post = useSelector((state: RootState) => state.AddPost)
    const { city, street, address, price } = useSelector((state: RootState) => state.AddPost)
    const dispatch = useDispatch()
    const disableButton = !!city && !!street && !!address && !!price

    const addPost = () => {

        const postJson = JSON.stringify(post)

        let formData = new FormData()

        if (droppedFiles) {
            droppedFiles.forEach((file: any) => formData.append(file.name, file))
        }

        formData.append("post", postJson)

        api.post('/post/add-post', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                setDroppedFiles([])
                setAlert({status: ALERT.SUCCESS, message: "post successful add"})
                dispatch({ type: 'AP_INIT' })
            })
            .catch(function (error) {
                console.log(error);
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
                    <Button variant="contained" onClick={addPost} disabled={!disableButton}>ADDNEWPOST</Button>
                </Box>
            </Box>
        </div>
    );
}


