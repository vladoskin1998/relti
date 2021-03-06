import React, { ReactElement, useContext, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AlertType } from '../types/types';
import Context from '../context/context';
import { ALERT } from '../enum/enum';

export default function AlertMessage({ alert }: { alert: { status: AlertType, message: string } }): ReactElement {

    const { setAlert } = useContext(Context)

    useEffect(() => {

        const closeAlert = () => setAlert(ALERT.NONE)
        document.body.addEventListener('click', closeAlert)

        return () => document.body.removeEventListener('click', closeAlert)
    }, [])

    const message = () => {
        switch (alert.status) {
            case ALERT.ERROR:
                return (
                    <Alert severity="error">
                        <AlertTitle>DELETE</AlertTitle>
                        {alert.message}
                    </Alert>
                )
            case ALERT.SUCCESS:
                return (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {alert.message}
                    </Alert>
                )
            default:
                break;
        }
    }

    return <div className='alert'> {message()}</div>
}


