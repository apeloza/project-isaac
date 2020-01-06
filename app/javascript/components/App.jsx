import React from "react";
import NavRouter from "../routes/NavRouter";
import UserMenu from "../components/layout/UserMenu";
import LogoHeader from "./layout/LogoHeader";


//Master component/entry point
//Router is rendered here as well
class App extends React.Component {
    constructor(){
      super();

      //current user is held here and propagated to children as necessary
      this.state = {
        currentUser: null
      }

      this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    //checks who the current user is (if any) as soon as component loads
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
          <div className="row align-items-center justify-content-end mt-2 mb-3">
            <div className="col-sm-4"><LogoHeader/></div>
            <div className="col-sm"><UserMenu currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/></div>
          </div>
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