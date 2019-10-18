import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { FormGroup, Form, Input, Button } from "reactstrap";
import Axios from "axios";

// general styling

const formStyle = {
  margin: 15
};

const buttonStyle = {
  backgroundColor: "#f95959",
  color: "white",
  borderColor: "#f95959",
  marginTop: 15,
  marginBottom: 15
};

// component code

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleLoginCheck();
    console.log(this.state.password);
  };

  handleInput = (name, value) => {
    this.setState({
      [name]: value
    });
    console.log(this.state.username);
    console.log(this.state.password);
  };

  handleLoginCheck = () => {
    const { username, password } = this.state;
    Axios.post(`https://insta.nextacademy.com/api/v1/login`, {
      username,
      password
    })
      .then(result => {
        console.log(result);
        let JWT = result.data.auth_token; // pass auth token from returned data
        console.log(JWT);
        localStorage.setItem("userToken", JWT);
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    // console.log("loginform props", this.props);
    return (
      <>
        <div className="d-flex flex-column p-2" style={formStyle}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <h1>Log In</h1>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username or email address"
                onChange={e => this.handleInput(e.target.name, e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => this.handleInput(e.target.name, e.target.value)}
              />
            </FormGroup>
            <Button style={buttonStyle}>Log In</Button>
          </Form>
          <button className="btn btn-link"
            onClick={this.props.toggleLogin}> Don't have an account yet? Sign up
            now
          </button>
        </div>
      </>
    );
  }
}

export default LoginForm;
