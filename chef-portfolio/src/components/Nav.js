import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav-bar">
      <NavLink exact className="App-link" activeClassName="active-nav" to="/">
        Home
      </NavLink>
      <NavLink className="App-link" activeClassName="active-nav" to="/register">
        Register
      </NavLink>
      <NavLink className="App-link" activeClassName="active-nav" to="/Login">
        Login
      </NavLink>
      <NavLink className="App-link" activeClassName="active-nav" to="/Recipes">
        Recipes
      </NavLink>
    </div>
  );
}
export default Nav;
