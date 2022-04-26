import React from "react";
import Navigation from "./navbar/navigation.tsx";
import List from './list/list.tsx';
import '../style/style.scss'
import NewPost from './new-post/newPost';
import { Routes, Route } from "react-router-dom";
import Loader from '../ui/loader.tsx';
import { useSelector } from 'react-redux';
import Auth from './auth/auth'

function App() {

    const loader = useSelector(state => state.LoaderChange)

    return (
        <>
            <div className="nav">
                <Navigation />
            </div>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/add-post" element={<NewPost />} />
            </Routes>
            { loader && <Loader />}
        </>
    );
}

export default App;
