import React from "react";

//components
import MainNav from "../components/navigation"


function MainPage() {
    return (
        <div className="App">
            <MainNav />
            <div className="App-main">
                <p>Main page</p>
            </div>
        </div>
    );
}

export default MainPage;