// RegisterC.js
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import withNavigation from "./withNavigation"; // Adjust the import path as necessary

class RegisterC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      Admins: [],
      Users: [],
      panel: "None",
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.setState({
      Users: JSON.parse(localStorage.getItem("Users")) || [],
      Admins: JSON.parse(localStorage.getItem("Admins")) || [],
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, panel, Admins, Users } =
      this.state;

    if (panel === "None") {
      this.setState({ errorMessage: "Please select a panel." });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ errorMessage: "Passwords do not match." });
      return;
    }

    let match;
    if (panel === "Admin") {
      match = Admins.find((admin) => admin.email === email);
      if (Users.find((user) => user.email === email)) {
        this.setState({ errorMessage: "Email already exists as a user." });
        return;
      }
    } else if (panel === "User") {
      match = Users.find((user) => user.email === email);
      if (Admins.find((admin) => admin.email === email)) {
        this.setState({ errorMessage: "Email already exists as an admin." });
        return;
      }
    }

    if (match) {
      this.setState({ errorMessage: "Email already exists." });
      return;
    }

    const newUser = { username, email, password };
    if (panel === "User") {
      const newUsers = [...Users, newUser];
      this.setState({ Users: newUsers });
      localStorage.setItem("Users", JSON.stringify(newUsers));
    } else if (panel === "Admin") {
      const newAdmins = [...Admins, newUser];
      this.setState({ Admins: newAdmins });
      localStorage.setItem("Admins", JSON.stringify(newAdmins));
    }
    alert("navigating to Login")
    this.props.navigate("/login"); // Use the navigate function passed via props
  };

  render() {
    const { username, email, password, confirmPassword, panel, errorMessage } =
      this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1 align="center">Register Form</h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <table align="center">
          <tbody>
            <tr>
              <td>Username</td>
              <td>:</td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td>
                <input
                  type="email"
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
            <tr>
              <td>Confirm Password</td>
              <td>:</td>
              <td>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Panel</td>
              <td>:</td>
              <td>
                <select name="panel" value={panel} onChange={this.handleChange}>
                  <option value="None">None</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <center>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </center>
      </form>
    );
  }
}

export default withNavigation(RegisterC); // Wrap the component with the HOC
