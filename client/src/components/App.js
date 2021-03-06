import React, { useEffect, useState, useRef } from "react";
import Navigation from "./navbar/navigation.tsx";
import List from './list/list.tsx';
import '../style/style.scss'
import NewPost from './new-post/newPost';
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loader from '../ui/loader.tsx';
import Auth from './auth/auth'
import LoaderContext from '../context/context';
import About from './about/about';
import Send from './send/send';
import { ROLE, ALERT, AUTH } from '../enum/enum';
import { parseToken } from '../actions/parseToken';
import axios from 'axios';
import AlertMessage from '../ui/message';
import { baseURL } from '../config'
import ItemScreen from './list/itemScreen';

function App() {

    const [loader, setLoader] = useState(false)

    const [alert, setAlert] = useState({status:ALERT.NONE, message: ""})

    const {accessToken} = useSelector(state=> state.AuthReducer)

    const dispatch = useDispatch()

    let getPosts = useRef(null)

    let location = useLocation();

    useEffect(() => {
        axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true, })
            .then((response) => {
                if (response?.data?.accessToken) {
                    dispatch({ type: "AUTH_UPDATE", payload: response?.data?.accessToken })
                }
                setLoader(false)
            })
            .catch(function (error) {
                dispatch({ type: "AUTH_DELETE" })
                setLoader(false)
                console.log("AUTH_DELETE",error);
            });
    }, [])

    return (
        <LoaderContext.Provider value={{ setLoader, setAlert, getPosts }}>
            <div className="nav">
                <Navigation />
            </div>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/slick" element={<ItemScreen />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                {
                    accessToken
                        ? <Route path="/send" element={<Send />} />
                        : <Route path="*" element={<Navigate to="/auth" state={{ from: location, auth: AUTH.LOGIN }} replace />} />

                }
                {
                    accessToken && ROLE.ADMIN === parseToken?.payload(accessToken)?.role
                        ? <Route path="/add-post" element={<NewPost />} />
                        : <Route path="*" element={<Navigate to="/auth" state={{ auth: AUTH.LOGIN }} replace />} />

                }
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {loader && <Loader />}
            <AlertMessage alert={alert} />
        </LoaderContext.Provider>
    );
}

export default App;
