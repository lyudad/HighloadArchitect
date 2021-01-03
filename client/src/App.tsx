import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Login from 'Pages/Login'
import Registration from 'Pages/Registration'
import Home from 'Pages/Home'

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
