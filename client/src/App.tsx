import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Login from 'Pages/Login'
import Registration from 'Pages/Registration'
import Home from 'Pages/Home'
import Profile from 'Pages/Profile'
import Profiles from 'Pages/Profiles'

const queryClient = new QueryClient()

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={(props) => (
    !!localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <div>
          <ul>
            {(!localStorage.getItem('token')) &&
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            }
             {(!!localStorage.getItem('token')) &&
              <>
                  <div onClick={()=>{
                    console.log("here")
                    localStorage.removeItem('token')
                  }}>Log out</div>
                  <li>
                    <Link to="/profile">My profile</Link>
                  </li>
                  <li>
                    <Link to="/profiles">Other profiles</Link>
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
              <Login />
            </Route>
            <Route path="/register">
              <Registration />
            </Route>
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/profiles" component={Profiles} />
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}
