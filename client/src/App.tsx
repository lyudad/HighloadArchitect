import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Login from 'Pages/Login'
import Registration from 'Pages/Registration'
import Home from 'Pages/Home'

const queryClient = new QueryClient()

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}
        <ReactQueryDevtools initialIsOpen={false} />
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
              <Route path="/" exact>
                <Home />
               </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Registration />
              </Route>
            </Switch>
          </div>
        </Router>
      </QueryClientProvider>
  );
}
