import React, { useState } from 'react';

import useGlobal from '../store';

// This import loads the firebase namespace along with all its type information.
import firebase from '../helpers/firebase';

const Register = props => {
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
  //get from state the regErr to show error if username is taken
  const { regErr } = globalState;

  const submitHandler = event => {
    event.preventDefault();
    const newUserData = { username, password, name, city, state, email, phone };
    console.log(globalState);
    //send CRUD request to API with the user info as argument
    globalActions.users.registerUser(newUserData, props);
  };

  //firebase auth with google
  const fireBaseAuth = e => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        const user = res.user;
        // console.log('User name: ', user.displayName);
        // console.log('User email: ', user.email);
        // console.log('User UID: ', user.uid);
        const creds = {
          username: user.email,
          password: user.uid,
          name: user.displayName,
          email: user.email
        };
        // console.log('Credentials: ', creds);
        //pass the creds to the method to login and redirect user
        globalActions.users.registerUser(creds, props);

        //here we could pass the user info from google to the db
      });
  };

  return (
    <div className="container">
      <h1>Create account</h1>
      {regErr && (
        <p className="wrong-creds">
          User name and email must be unique, try again!
        </p>
      )}
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
          />
        </div>
        <div className="col-75">
          <input
            placeholder="State"
            type="text"
            name="state"
            onChange={e => setState(e.target.value)}
            onBlur={e => setState(e.target.value)}
          />
        </div>
        <div className="col-75">
          <input
            placeholder="Email"
            type="email"
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
          <button className="button" type="submit">
            Register
          </button>
        </div>

        <div className="col-75">
          <button className="button" type="button" onClick={fireBaseAuth}>
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
