import React, { useState } from 'react';

import useGlobal from '../store';

const Register = () => {
  //For hooks this replaces the change handler
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('name');
  const [city, setCity] = useState('city');
  const [state, setState] = useState('state');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phone');
  //   console.log(username);
  const [globalState, globalActions] = useGlobal();

  const submitHandler = event => {
    event.preventDefault();
    const newUserData = { username, password, name, city, state, email, phone };
    console.log(globalState);
    //send CRUD request to API with the user info as argument
    globalActions.registerUser(newUserData);
  };
  return (
    <div className="container">
      <h1>Create account</h1>
      <form className="register-form" onSubmit={submitHandler}>
        <div className="col-75">
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={e => setUserName(e.target.value)}
            onBlur={e => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Password"
            type="text"
            name="password"
            onChange={e => setPassword(e.target.value)}
            onBlur={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={e => setName(e.target.value)}
            onBlur={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="City"
            type="text"
            name="city"
            onChange={e => setCity(e.target.value)}
            onBlur={e => setCity(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="State"
            type="text"
            name="state"
            onChange={e => setState(e.target.value)}
            onBlur={e => setState(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={e => setEmail(e.target.value)}
            onBlur={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Phone"
            type="text"
            name="phone"
            onChange={e => setPhone(e.target.value)}
            onBlur={e => setPhone(e.target.value)}
          />
        </div>
        <div className="col-75">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
