import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Form, Input, Button, FormFeedback } from "reactstrap";
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

class SignupForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
    // usernameValid: undefined
  };

  // functions code

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.signUpNewUser(username, email, password);
  };

  handleInput = e => {
    // copy the contents of the event into another object
    let x = { ...e };
    // call function after delay of 300ms
    let delay = setTimeout(() => this.handleUsernameCheck(x), 500);
    // save the input and delay inside the state
    this.setState({
      [e.target.name]: e.target.value,
      delay
    });
  };

  handleUsernameCheck = e => {
    const newUsername = e.target.value;
    if (newUsername.length >= 6) {
      Axios.get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
        .then(result => {
          console.log(result);
          // condition to check that username doesn't exist yet
          if (result.data.valid) {
            this.setState({
              usernameValid: true // giving state a new, previously uninitialized property
            });
          } else {
            this.setState({
              usernameValid: false
            });
          }
        })
        .catch(error => {
          console.log(error.response);
        });
      // } else {
      //   this.setState({
      //     usernameValid: false
      //   });
    }
  };

  // render code

  render() {
    const { username, usernameValid, email, password } = this.state;
    // function usernameInvalid() {
    //   if (usernameValid == undefined) {
    //     return false;
    //   } else {
    //     return !usernameValid;
    //   }
    // }
    return (
      <>
        <div style={formStyle}>
          <h1>Sign Up</h1>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                // valid={usernameValid}
                // invalid={usernameInvalid()}
                onChange={e => {
                  if (this.state.delay) {
                    clearTimeout(this.state.delay);
                  }
                  this.handleInput(e);
                }}
                {...(username.length >= 6
                  ? usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : username.length > 0
                  ? { invalid: true }
                  : "")}
              />
              <FormFeedback
                {...(username.length > 0 && username.length >= 6
                  ? usernameValid
                    ? { valid: true }
                    : { invalid: true }
                  : { invalid: true })}
              >
                {username.length >= 6
                  ? usernameValid
                    ? "Yay! This username is available :)"
                    : "Sorry, this username is taken :("
                  : "Must be minimum 6 characters"}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="email"
                placeholder="Email address"
                onChange={e => {
                  if (this.state.delay) {
                    clearTimeout(this.state.delay);
                  }
                  this.handleInput(e);
                }}
              />
            </FormGroup>
            <FormFeedback></FormFeedback>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Password must be min. 8 characters"
                onChange={e => this.handleInput(e)}
              />
            </FormGroup>
            <FormFeedback></FormFeedback>
            <FormGroup>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password by typing it again"
                onChange={e => this.handleInput(e)}
              />
            </FormGroup>
            <FormFeedback></FormFeedback>
            <Button style={buttonStyle}>Sign Up</Button>
          </Form>
          <button className="btn btn-link" onClick={e => this.props.toggleLogin(e)}>
            Already a user? Log in here
          </button>
        </div>
      </>
    );
  }
}

export default SignupForm;
