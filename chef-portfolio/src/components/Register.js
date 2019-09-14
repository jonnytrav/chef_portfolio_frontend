import React from 'react';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <h1>Registration Form</h1>
        <form className="register-form" onSubmit={this.submitHandler}>
          <div className="col-75">
            <input
              placeholder="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="col-25">{/* <label>Username</label> */}</div>
          <div className="col-75">
            <input
              placeholder="Password"
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="col-75">
            <input
              placeholder="City"
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.changeHandler}
            />
          </div>
          <div className="col-75">
            <input
              placeholder="State"
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.changeHandler}
            />
          </div>
          <div className="col-75">
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className="col-75">
            <input
              placeholder="Phone"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.changeHandler}
            />
          </div>
          <div className="col-75">
            <button>Register</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
