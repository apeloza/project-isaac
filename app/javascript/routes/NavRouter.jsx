import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavMenu from "../components/layout/NavMenu";
import FlexSearch from "../components/views/FlexSearch";
import Items from "../components/views/Items";
import MyBuild from "../components/views/MyBuild";
import Register from "../components/views/auth/Register";

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
            <Route path="/" exact component={FlexSearch} />
            <Route path="/items" exact component={Items} />
            <Route path="/my-build" exact component={MyBuild} />
            <Route path="/register" exact render={() => <Register currentUser={this.props.currentUser} updateCurrentUser={this.props.updateCurrentUser} />} />
          </Switch>
        </div>
      </>
    )
  }
}

export default NavRouter;
  
