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
    confirmPassword: "",
    disableSignUp: true
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
    // this.checkEmail();
    // this.checkPassword();
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
    }
  };

  // checkEmail = (e) => {
  //   // don't remember from where i copied this code, but this works.
  //   let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (check.test(email)) {
  //     // this is a valid email address
  //     // call setState({email: email}) to update the email
  //     // or update the data in redux store.
  //     this.setState({
  //       email: e.target.value
  //     })
  //   } else {
  //     // invalid email, maybe show an error to the user.
  //     alert("Please enter a valid email address")
  //   }
  // };

  // checkPassword = () => {
  //   const { confirmPassword, password} = this.state
  //   if(confirmPassword != password) {
  //       alert("Please make sure your password matches")
  //     }
  //   };

  checkDisabled = () => {
    const { username, email, password, confirmPassword } = this.state;
    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      this.setState({
        disableSignUp: false
      });
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
          <button
            className="btn btn-link"
            disabled={this.disableSignUp}
            onClick={(e) => {this.props.toggleLogin(e); this.checkDisabled(e)}}
          >
            Already a user? Log in here
          </button>
        </div>
      </>
    );
  }
}

export default SignupForm;
