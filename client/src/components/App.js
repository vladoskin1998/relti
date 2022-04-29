import React, { useEffect, useState } from "react";
import Navigation from "./navbar/navigation.tsx";
import List from './list/list.tsx';
import '../style/style.scss'
import NewPost from './new-post/newPost';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loader from '../ui/loader.tsx';
import Auth from './auth/auth'
import LoaderContext from '../context/context';
import About from './about/about';
import Send from './send/send';
import { ROLE, ALERT } from '../enum/enum';
import { parseToken } from '../actions/parseToken';
import axios from 'axios';
import AlertMessage from '../ui/message';

function App() {

    const [loader, setLoader] = useState(false)
    const [alert, setAlert] = useState(ALERT.NONE)
    
    let location = useLocation();

    useEffect(() => {
        axios.post('http://localhost:5000/api/auth/refresh', {}, {withCredentials: true,})
            .then((response) => {
                if(response?.data?.accessToken){
                    localStorage.setItem('accessToken', response?.data?.accessToken)
                }
                setLoader(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoader(false)
            });
    }, [])

    return (
        <LoaderContext.Provider value={{ setLoader, setAlert }}>
            <div className="nav">
                <Navigation />
            </div>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                {
                    localStorage.getItem('accessToken')
                        ? <Route path="/send" element={<Send />} />
                        : <Route path="*" element={<Navigate to="/auth" state={{ from: location }} replace />} />

                }
                {
                    localStorage.getItem('accessToken') &&  ROLE.ADMIN === parseToken?.payload?.role 
                        ? <Route path="/add-post" element={<NewPost />} />
                        : <Route path="*" element={<Navigate to="/auth" replace />} />

                }
            </Routes>
            {loader && <Loader />}
            <AlertMessage alert={alert}/>
        </LoaderContext.Provider>
    );
}

export default App;
