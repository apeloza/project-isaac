import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../views/Logout";

class NavMenu extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <aside>
        Welcome {this.props.currentUser}
        <NavLink exact to="/" className="btn btn-block btn-light link-item">Flex Search</NavLink>
        <NavLink to="/items" className="btn btn-block btn-light link-item">Master Item List</NavLink>
        <NavLink to="/my-build" className="btn btn-block btn-light link-item">My Build</NavLink>
        <NavLink to="/login" className="btn btn-block btn-light link-item">Login</NavLink>
        <NavLink to="/register" className="btn btn-block btn-light link-item">Register</NavLink>
        <Logout updateCurrentUser={this.props.updateCurrentUser} />
      </aside>
    )
  }
}

export default NavMenu;

