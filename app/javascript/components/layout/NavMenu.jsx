import React from "react";
import { NavLink } from "react-router-dom";

export default () => (
      <aside>
        {/* TODO: Add in collapsing sidebar here maybe */}
        <NavLink exact to="/" className="btn btn-link link-item">Flex Search</NavLink>
        <NavLink to="/items" className="btn btn-link link-item">Master Item List</NavLink>
      </aside>
  );