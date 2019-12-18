import React from "react";
import { Link } from "react-router-dom";
import FlexSearch from "./FlexSearch";
import Items from "./Items";

export default () => (
  <div className="container">
    <aside>
      {/* TODO: Add in sidebar here maybe */}
    </aside>
    <section>
      <div>
        <h4>Project Isaac</h4>
        <p>A React + Rails utility to help get you through the basement.</p>
      </div>
      <FlexSearch/>
      <Items/>
    </section>
  </div>
);