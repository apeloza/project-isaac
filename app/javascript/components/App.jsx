//Entry point for React
//Router is also initialized here


import React from "react";
import Routes from "../routes/Index";


class App extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                {Routes}
                </div>
            </div>
        )
    }
}

export default App;