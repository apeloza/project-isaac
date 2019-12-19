import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FlexSearchWrapper from "../components/wrappers/FlexSearchWrapper";
import ItemListWrapper from "../components/wrappers/ItemListWrapper";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={FlexSearchWrapper} />
      <Route path="/items" exact component={ItemListWrapper} />
    </Switch>
  </Router>
);