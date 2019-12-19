import React from "react";
import Items from "../views/Items";
import NavMenu from '../NavMenu';

export default () => (
  <div className="container">
    <div className="row">
      <NavMenu/>
    <Items/>
    </div>
  </div>
);