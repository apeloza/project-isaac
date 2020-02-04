import React from "react";
import NavRouter from "../routes/NavRouter";
import UserMenu from "../components/layout/UserMenu";
import LogoHeader from "./layout/LogoHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



//Master component/entry point
//Router is rendered here as well
class App extends React.Component {
    constructor(){
      super();

      //current user is held here and propagated to children as necessary
      this.state = {
        currentUser: null,
        currentBuild: [],
        aesthetic: false,
      }

      this.updateCurrentUser = this.updateCurrentUser.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this.goToTheMall = this.goToTheMall.bind(this);
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
          this.setState({currentBuild: response.currentBuild})
        } else {
          this.setState({currentUser: null});
        }    
      }).catch(error => console.log(error.message));
    }

    updateCurrentUser(email){
      this.setState({currentUser: email});
    }
    
    addItem(item){
      const newBuild = this.state.currentBuild.concat(item);
      this.setState({currentBuild: newBuild});

      //now save the build to the user's profile, if applicable
      if(this.state.currentUser !== null){
        this.updateBuild(newBuild);
      }
    }

    removeItem(itemToRemove){
      const newBuild = this.state.currentBuild.slice();
      const itemIndex = newBuild.findIndex(item => item.name === itemToRemove.name) // find the first instance of an item with matching name
      newBuild.splice(itemIndex, 1); //remove first index found
      this.setState({currentBuild: newBuild})
      if(this.state.currentUser !== null){
        this.updateBuild(newBuild);
      }
      
    }

    updateBuild(newBuild){
      //send only the necessary ids to the backend to save
      let itemIdArray = [];

      newBuild.forEach(function(item){
        itemIdArray.push(item.item_id);
      })

      const token = document.querySelector('meta[name="csrf-token"]').content;
      const url = '/builds/save_build';
      fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({itemIds: itemIdArray})
      }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error("Issue with network response. Oops!")
      }).then(response => {
      }).catch(error => console.log(error.message));
    }

    // our prices have never been l o w e r
    goToTheMall(){
      this.setState({aesthetic: true});
    }

    render(){
      return(
        <Router>

          <div className="container">
            <div className="row align-items-center justify-content-end mt-2 mb-3">
              <div className="col-sm-4"><LogoHeader goToTheMall={this.goToTheMall} /></div>
              <div className="col-sm"><UserMenu currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/></div>
            </div>
            <div className="row">
              <NavRouter
              currentUser={this.state.currentUser} 
              updateCurrentUser={this.updateCurrentUser}
              currentBuild={this.state.currentBuild}
              addItem={this.addItem}
              removeItem={this.removeItem}
              aesthetic={this.state.aesthetic} />
            </div>
          </div>
        </Router>
      )
    }
}

export default App;