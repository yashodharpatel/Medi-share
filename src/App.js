import React from "react";
import { Home } from "./Pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      </Switch>
      </Router>
  );
}
