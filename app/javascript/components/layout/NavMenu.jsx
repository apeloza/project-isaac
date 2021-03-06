import React from "react";
import { NavLink } from "react-router-dom";

//Navigation menu found on the left 
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
      </aside>
    )
  }
}

export default NavMenu;

