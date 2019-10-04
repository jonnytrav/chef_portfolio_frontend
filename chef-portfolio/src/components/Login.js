import React, { useState } from 'react';

// This import loads the firebase namespace along with all its type information.
import firebase from '../config/firebase';

//importing store and actions
import useGlobal from '../store';

const Login = props => {
  //For hooks this replaces the change handler
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');

  const [globalState, globalActions] = useGlobal();
  //get from state the loginUathorized to show error if creds are wrong
  const { loginUnaut } = globalState;
  const submitHandler = event => {
    event.preventDefault();
    const creds = { username, password };
    // console.log('From Login Form', globalState);
    //send CRUD request to API for login
    globalActions.users.Login(creds, props);
  };

  const fireBaseAuth = e => {
    e.preventDefault();

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        const user = res.user;
        console.log(user);

        //here we could pass the user info from google to the db
      });
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form className="register-form" onSubmit={submitHandler}>
        <div className="col-75">
          <input
            placeholder="Username"
            type="text"
            name="username"
            autoComplete="user-name"
            onChange={e => setUserName(e.target.value)}
            onBlur={e => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            onBlur={e => setPassword(e.target.value)}
            required
          />
        </div>
        {loginUnaut && (
          <p className="wrong-creds">Incorrect credentials, try again.</p>
        )}

        <div className="col-75">
          <button type="submit">Login</button>
        </div>
        <div className="col-75">
          <button type="button" onClick={fireBaseAuth}>
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
