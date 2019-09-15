import React, { useState } from 'react';

import useGlobal from '../store';

const Login = () => {
  //For hooks this replaces the change handler
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');

  const [globalState, globalActions] = useGlobal();

  const submitHandler = event => {
    event.preventDefault();
    const creds = { username, password };
    console.log(globalState);
    //send CRUD request to API for login
    globalActions.Login(creds);
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
            onChange={e => setUserName(e.target.value)}
            onBlur={e => setUserName(e.target.value)}
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Password"
            type="text"
            name="password"
            onChange={e => setPassword(e.target.value)}
            onBlur={e => setPassword(e.target.value)}
          />
        </div>
        <div className="col-75">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
