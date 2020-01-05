//Entry point for React
//Router is also initialized here


import React from "react";
import NavRouter from "../routes/NavRouter";


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
            if(response.email){
                this.setState({currentUser: response.email});
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
                <NavRouter 
                currentUser={this.state.currentUser} 
                updateCurrentUser={this.updateCurrentUser} />
                </div>
            </div>
        )
    }
}

export default App;