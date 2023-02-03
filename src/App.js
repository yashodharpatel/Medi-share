import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./Contexts/Authcontext";
import Home from "./Pages/Home";
import Createaccount from "./Pages/CreateAccount";
import CreateAccountNGO from "./Pages/CreateAccountNGO";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Donar from "./Components/Donar";
import NGODashboard from "./Pages/NGODashboard";
import Receiver from "./Components/Receiver";

export default function App() {
  const { currentUser } = useAuth();

  return (
    <div style={{ overflow: "hidden" }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {currentUser ? (
            <Switch>
              <Route exact path="/create-account/" component={Createaccount} />
              <Route
                exact
                path="/create-ngo-account/"
                component={CreateAccountNGO}
              />
              <PrivateRoute exact path="/dashboard/" component={Dashboard} />
              <PrivateRoute exact path="/ngo-dashboard/" component={NGODashboard} />
              <PrivateRoute exact path="/donar/" component={Donar} />
              <PrivateRoute exact path="/receiver/" component={Receiver} />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Router>
    </div>
  );
}
