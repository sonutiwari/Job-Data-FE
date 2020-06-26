import React, { Component } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      file: "",
      source: ''
    };

    this.update = this.update.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.registerUser = this.registerUser.bind(this);
    console.log(this.state);
  }

  update(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  updateFile(event) {
    let name = event.target.name;
    
    this.setState({
      [name]: event.target.files[0],
    });
    console.log(event.target.files[0], 'files', this.state);
  }

  async registerUser(event) {
    event.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      alert("Password and confirm password Did not match");
      return;
    }
    let formData = new FormData();
    formData.append('fullname', this.state.fullname);
    formData.append('file', this.state.file);
    const value = await bcrypt.hash(this.state.password, 10);
    formData.set('password', value);
    formData.set('email', this.state.email);
    const URL = 'http://localhost:4000/api/v1/candidate';
    const CONFIG = {'Content-Type': 'multipart/form-data' };
    const response = await axios.post(URL, formData, CONFIG);
    console.log(response);
  }

  render() {
    return (
      <div className="register">
        <form onSubmit={this.registerUser}>
          <h2>Candidate Register</h2>

          <div className="name">
            <label htmlFor="fullName">Full Name:* </label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={this.state.fullname}
              onChange={this.update}
              id="fullName"
              required
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email:* </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.update}
              id="email"
              required
            />
          </div>

          <div className="pasword">
            <label htmlFor="password">Password:* </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.update}
              id="password"
              required
            />
          </div>

          <div className="password">
            <label htmlFor="confirmPassword">Confirm Password:* </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={this.update}
              id="confirmPassword"
              required
            />
          </div>
          <div>
            <label htmlFor="resume">Upload Resume:* </label>
            <input
              name="file"
              type="file"
              accept=".pdf"
              onChange={this.updateFile}
              required
            />
          </div>
          <div>
            <label htmlFor="source">Source: </label>
            <input
              name="source"
              type="text"
              onChange={this.updateFile}
            />
          </div>
          <input type="submit" value="Register" onClick={this.registerUser} />
        </form>
      </div>
    );
  }
}

export default Register;
