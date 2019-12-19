import React from "react";
import { Link } from "react-router-dom";

export default () => (
      <aside className="col-sm-2">
        {/* TODO: Add in collapsing sidebar here maybe */}
        <Link to="/" className="btn btn-link link-item">Flex Search</Link>
        <Link to="/items" className="btn btn-link link-item">Master Item List</Link>
      </aside>
  );