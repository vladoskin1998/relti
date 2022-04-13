import React from "react";
import Navigation from "./navbar/navigation";
import List from './list';

export default function Router() {
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


