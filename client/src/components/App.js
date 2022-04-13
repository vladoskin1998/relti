import React from "react";
import Router from './router.tsx'
import Navigation from "./navbar/navigation.tsx";
import List from './list.tsx';
import '../style/style.scss'


function App() {
  return (
    <>
      <div className="nav">
        <Navigation />
      </div>
      <div className="list">
        <List />
      </div>
    </>
  );
}

export default App;
