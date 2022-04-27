import React, { useState } from "react";
import Navigation from "./navbar/navigation.tsx";
import List from './list/list.tsx';
import '../style/style.scss'
import NewPost from './new-post/newPost';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loader from '../ui/loader.tsx';
import Auth from './auth/auth'
import LoaderContext from '../context/loaderContext';
import About from './about/about';
import Send from './send/send';
import { ROLE } from '../enum/enum'
import { parseToken } from '../actions/parseToken'

function App() {

    const [loader, setLoader] = useState(false)
    
    let location = useLocation();

    console.log(location)

    return (
        <LoaderContext.Provider value={{ loader, setLoader }}>
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
        </LoaderContext.Provider>
    );
}

export default App;
