import React from "react";
import { NavLink } from "react-router-dom";

class NavMenu extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <aside>
      <NavLink exact to="/" className="btn btn-link link-item">Flex Search</NavLink>
      <NavLink to="/items" className="btn btn-link link-item">Master Item List</NavLink>
      <NavLink to="/my-build" className="btn btn-link link-item">My Build</NavLink>
    </aside>
    )
  }
}

export default NavMenu;

