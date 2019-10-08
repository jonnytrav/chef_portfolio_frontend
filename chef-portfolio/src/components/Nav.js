import React from 'react';
import { NavLink } from 'react-router-dom';

//accessing state for redender myrecipes navlink
import useGlobal from '../store';

const Nav = () => {
  const [globalState, globalActions] = useGlobal();
  const { isLoggedIn } = globalState;

  const signOut = () => {
    globalActions.users.LogOut();
  };

  return (
    <div className="nav-bar ">
      <NavLink exact className="App-link" activeClassName="active-nav" to="/">
        Home
      </NavLink>
      <NavLink className="App-link" activeClassName="active-nav" to="/recipes">
        All Recipes
      </NavLink>

      <NavLink
        className={`App-link ${!isLoggedIn ? '' : 'hide-nav'}`}
        activeClassName="active-nav"
        to="/register"
      >
        Register
      </NavLink>

      <NavLink
        className={`App-link ${!isLoggedIn ? '' : 'hide-nav'}`}
        activeClassName="active-nav"
        to="/login"
      >
        Login
      </NavLink>

      <NavLink
        className={`App-link ${isLoggedIn ? '' : 'hide-nav'}`}
        activeClassName="active-nav"
        to="/newpost"
      >
        New Post
      </NavLink>

      <NavLink
        className={`App-link ${isLoggedIn ? '' : 'hide-nav'}`}
        activeClassName="active-nav"
        to="/myrecipes"
      >
        My Recipes
      </NavLink>

      <NavLink
        className={`App-link ${isLoggedIn ? '' : 'hide-nav'}`}
        activeClassName="active-nav"
        to="/login"
        onClick={signOut}
      >
        Log out
      </NavLink>
    </div>
  );
};
export default Nav;
