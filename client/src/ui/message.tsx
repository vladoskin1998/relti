import React, { ReactElement, useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AlertType } from '../types/types';
import Context from '../context/context';
import { ALERT } from '../enum/enum';

export default function AlertMessage({ alert }: { alert: AlertType }): ReactElement {

    const { setAlert } = useContext(Context)

    useEffect(() => {

        const closeAlert = () => setAlert(ALERT.NONE)
        document.body.addEventListener('click', closeAlert)

        return () => document.body.removeEventListener('click', closeAlert)
    }, [])

    const message = () => {
        switch (alert) {
            case ALERT.ERROR:
                return (
                    <Alert severity="error">
                        <AlertTitle>DELETE</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                    </Alert>
                )
            case ALERT.SUCCESS:
                return (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>check it out!</strong>
                    </Alert>
                )
            default:
                break;
        }
    }

    return <div className='alert'> {message()}</div>
}


