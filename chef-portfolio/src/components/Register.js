import React, { useState } from 'react';

const Register = () => {
  //For hooks this replaces the change handler
  const [username, setUserName] = useState('username');
  const [password, setPassword] = useState('password');
  const [city, setCity] = useState('city');
  const [state, setState] = useState('state');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phone');
  //   console.log(username);
  const submitHandler = event => {
    event.preventDefault();
    console.log({ username, password, city, state, email, phone });
  };
  return (
    <div className="container">
      <h1>Registration Form</h1>
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
            type="text"
            name="email"
            onChange={e => setEmail(e.target.value)}
            onBlur={e => setEmail(e.target.value)}
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
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};

// class Register extends React.Component {
//   state = {
//     username: '',
//     password: '',
//     city: '',
//     state: '',
//     email: '',
//     phone: ''
//   };

//   changeHandler = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   submitHandler = event => {
//     event.preventDefault();
//     console.log(this.state);
//   };

//   render() {
//     return (
//       <div className="container">
//         <h1>Registration Form</h1>
//         <form className="register-form" onSubmit={this.submitHandler}>
//           <div className="col-75">
//             <input
//               placeholder="Username"
//               type="text"
//               name="username"
//               value={this.state.username}
//               onChange={this.changeHandler}
//
//             />
//           </div>
//           <div className="col-75">
//             <input
//               placeholder="Password"
//               type="text"
//               name="password"
//               value={this.state.password}
//               onChange={this.changeHandler}
//
//             />
//           </div>
//           <div className="col-75">
//             <input
//               placeholder="City"
//               type="text"
//               name="city"
//               value={this.state.city}
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="col-75">
//             <input
//               placeholder="State"
//               type="text"
//               name="state"
//               value={this.state.state}
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="col-75">
//             <input
//               placeholder="Email"
//               type="text"
//               name="email"
//               value={this.state.email}
//               onChange={this.changeHandler}
//
//             />
//           </div>
//           <div className="col-75">
//             <input
//               placeholder="Phone"
//               type="text"
//               name="phone"
//               value={this.state.phone}
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="col-75">
//             <button>Register</button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
export default Register;
