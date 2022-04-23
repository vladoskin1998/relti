import React from "react";
import Navigation from "./navbar/navigation.tsx";
import List from './list/list.tsx';
import '../style/style.scss'
import NewPost from './new-post/newPost';
import { Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <>
      <div className="nav">
        <Navigation />
      </div>

        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add-post" element={<NewPost />} />
        </Routes>
    

    </>
  );
}

export default App;
