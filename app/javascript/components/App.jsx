//Entry point for React
//Router is also initialized here


import React from "react";
import Routes from "../routes/Index";


class App extends React.Component {
    constructor(){
        super();

        this.state = {
            currentUser: null
        }
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    componentDidMount(){
        const url = '/users/check_for_user'
        fetch(url, {
            method: "GET",
          }).then(response => {
            if(response.ok){
              return response.json();
            }
            throw new Error("Issue with network response. Oops!")
          }).then(response => {
            console.log(response);
            if(response.data.email){
                this.setState({currentUser: response.data.email});
            } else {
                this.setState({currentUser: null});
            }
             
        }).catch(error => console.log(error.message));
    }

    updateCurrentUser(email){
        this.setState({currentUser: email});
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