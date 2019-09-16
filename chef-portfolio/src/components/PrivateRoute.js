import React from 'react';

//importing route and redirect to redirect user to login if not autheticated
import { Route, Redirect } from 'react-router-dom';

// Requirement 1.
// It has the same API as `<Route />`
//This code just means that the component will accept a component Prop,
// just like <Route /> does, then it will take any other prop
//that gets passed into it by spreading in ...rest.
const PrivateRoute = ({ component: Component, ...rest }) => (
  // Requirement 2.
  // It renders a `<Route />` and passes all the props through to it.
  <Route
    {...rest}
    render={props =>
      // Requirement 3.
      // It checks if the user is authenticated, if they are,
      // it renders the "component" prop. If not, it redirects
      // the user to /login.
      localStorage.getItem('authorization') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
