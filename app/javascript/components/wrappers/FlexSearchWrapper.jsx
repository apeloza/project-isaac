import React from "react";
import FlexSearch from "../views/FlexSearch";
import NavMenu from '../NavMenu';

export default () => (
  <div className="container">
    <div className="row">
      <NavMenu/>
      <FlexSearch/>
    </div>
  </div>
);