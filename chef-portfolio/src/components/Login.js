import React, { useState } from 'react';

//importing store and actions
import useGlobal from '../store';

const Login = props => {
  //For hooks this replaces the change handler
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');

  const [globalState, globalActions] = useGlobal();
  const { loginUnaut } = globalState;
  const submitHandler = event => {
    event.preventDefault();
    const creds = { username, password };
    // console.log('From Login Form', globalState);
    //send CRUD request to API for login
    globalActions.users.Login(creds, props);
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
      </form>
    </div>
  );
};
export default Login;
