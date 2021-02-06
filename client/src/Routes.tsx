import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Login from 'Pages/Login'
import Registration from 'Pages/Registration'
import Home from 'Pages/Home'
import Profile from 'Pages/Profile'
import Profiles from 'Pages/Profiles'
import Friends from 'Pages/Friends'

const UserContext = React.createContext(false);

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
    !!localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default function Routes() {
  const [isAuth, updateAuth] = useState(!!localStorage.getItem('token'))

  return (
      <UserContext.Provider value={isAuth}>
      <Router>
        <div>
          <ul>
            {!isAuth &&
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            }
             {isAuth &&
              <>
                  <div onClick={()=>{
                    updateAuth(false)
                    localStorage.removeItem('token')
                  }}>Log out</div>
                  <li>
                    <Link to="/profile">My profile</Link>
                  </li>
                  <li>
                    <Link to="/profiles">Other profiles</Link>
                  </li>
                  <li>
                    <Link to="/friends">My friends</Link>
                  </li>
              </>
            }
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login updateAuth={updateAuth}/>
            </Route>
            <Route path="/register">
              <Registration />
            </Route>
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/profiles" component={Profiles} />
            <PrivateRoute path="/friends" component={Friends} />
          </Switch>
        </div>
      </Router>
      </UserContext.Provider>
  );
}
