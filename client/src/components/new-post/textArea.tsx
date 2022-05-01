import React, { ReactElement } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store/store";

export default function Textarea(): ReactElement {

    const { describe } = useSelector((state: RootState) => state.AddPost)

    const dispatch = useDispatch()

    const hendlerTextArea = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch({ type: "AP_DESCRIBE", payload: e.target.value })
    }

    return (<TextareaAutosize
        aria-label="minimum height"
        placeholder="Your message"
        className='add__text-area'
        value={describe}
        onChange={hendlerTextArea}
    />
    );
}

