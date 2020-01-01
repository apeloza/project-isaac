import React from "react";
import { NavLink } from "react-router-dom";

class NavMenu extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <aside>
        <NavLink exact to="/" className="btn btn-block btn-light link-item">Flex Search</NavLink>
        <NavLink to="/items" className="btn btn-block btn-light link-item">Master Item List</NavLink>
        <NavLink to="/my-build" className="btn btn-block btn-light link-item">My Build</NavLink>
        <NavLink to="/login" className="btn btn-block btn-light link-item">Login</NavLink>
        <NavLink to="/register" className="btn btn-block btn-light link-item">Register</NavLink>
      </aside>
    )
  }
}

export default NavMenu;

