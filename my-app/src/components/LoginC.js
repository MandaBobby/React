import React, { Component } from "react";
import { Button } from "react-bootstrap";
import withNavigation from "./withNavigation"; // Adjust the import path as necessary

class LoginC extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.clear = { email: "", password: "" };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigate } = this.props;

    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const admins = JSON.parse(localStorage.getItem("Admins")) || [];

    let admin = admins.find(
      (admin) => admin.email === email && admin.password === password
    );
    let user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (admin) {
      navigate("/admin");
    } else if (user) {
      navigate("/user");
    } else {
      alert("Invalid credentials");
    }

    this.setState(this.clear);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1 align="center">Login Form</h1>
          <table align="center">
            <tbody>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>:</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <center>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </center>
        </form>
      </>
    );
  }
}

export default withNavigation(LoginC);
