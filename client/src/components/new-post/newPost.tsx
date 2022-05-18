import React, { ReactElement, useState, useContext } from "react";
import Textarea from './textArea';
import SecondLine from './secondLine';
import RadioPost from './radioPost';
import ImageDND from './imageDnD'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";
import { api } from '../../api/api'
import Context from '../../context/context';
import { ALERT } from '../../enum/enum';
import FirstLine from './firstLine'
import { FormHelperText } from '@mui/material';

export default function NewPost(): ReactElement {

    const [droppedFiles, setDroppedFiles] = useState([])
    const { setAlert, setLoader } = useContext(Context)
    const post = useSelector((state: RootState) => state.AddPost)
    const { city, street, address, price, square } = useSelector((state: RootState) => state.AddPost)
    const dispatch = useDispatch()
    const disableButton = !!city?.label && !!street?.label && !!address && !!price && !!square

    const addPost = () => {
        setLoader(true)
        const postJson = JSON.stringify(post)

        let formData = new FormData()

        if (droppedFiles) {
            droppedFiles.forEach((file: any) => formData.append(file.name, file))
        }

        formData.append("post", postJson)

        api.post('/post/add-post', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                setDroppedFiles([])
                setAlert({ status: ALERT.SUCCESS, message: "post successful add" })
                dispatch({ type: 'AP_INIT' })
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
            });
    }

    return (
        <Box className="add">
            <Box component="div" className="add__body">
                <FirstLine />
                <SecondLine />
                <RadioPost />
                <ImageDND droppedFiles={droppedFiles} setDroppedFiles={setDroppedFiles} />
                <Textarea />
                <Box className="add__button">
                    <Button variant="contained" onClick={addPost} disabled={!disableButton}>
                        Добавить пост
                    </Button>
                    {
                        !disableButton
                            ? <FormHelperText component='div'>3аполните обязательные поля</FormHelperText>
                            : <></>
                    }

                </Box>
            </Box>
        </Box>
    );
}


