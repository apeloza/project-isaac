import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavMenu from "../components/layout/NavMenu";
import FlexSearch from "../components/views/FlexSearch";
import Items from "../components/views/Items";
import MyBuild from "../components/views/MyBuild";
import Register from "../components/views/auth/Register";

//the switch case in this file hands *a lot* of passing through of props. This is a good place to look if a property isn't coming through as expected.

class NavRouter extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <>
        <div className="col-sm-2">
          <NavMenu currentUser={this.props.currentUser} updateCurrentUser={this.props.updateCurrentUser}/>
        </div>
        <div className="col-sm-10">
          <Switch>
            <Route path="/" exact render={() => <FlexSearch addItem={this.props.addItem} removeItem={this.props.removeItem} currentBuild={this.props.currentBuild} />} />
            <Route path="/items" exact render={() => <Items addItem={this.props.addItem} removeItem={this.props.removeItem} currentBuild={this.props.currentBuild} />} />
            <Route path="/my-build" exact render={() => <MyBuild addItem={this.props.addItem} removeItem={this.props.removeItem} currentBuild={this.props.currentBuild} />} />
            <Route path="/register" exact render={() => <Register currentUser={this.props.currentUser} updateCurrentUser={this.props.updateCurrentUser} />} />
          </Switch>
        </div>
      </>
    )
  }
}

export default NavRouter;
  
