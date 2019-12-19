import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavMenu from "../components/layout/NavMenu";
import FlexSearch from "../components/views/FlexSearch";
import Items from "../components/views/Items";

export default (
  <Router>
    <div className="col-sm-2">
      <NavMenu/>
    </div>
    <div className="col-sm-10">
      <Switch>
        <Route path="/" exact component={FlexSearch} />
        <Route path="/items" exact component={Items} />
      </Switch>
    </div>
  </Router>
);