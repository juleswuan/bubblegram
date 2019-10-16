import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Form, Input, Button } from "reactstrap";

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
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.props.signUpNewUser(username, email, password);
  };

  handleInput = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <>
        <div style={formStyle}>
          <h2>Register Me!</h2>
          <Form onSubmit={e => this.handleSubmit(e)}> 
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={e =>
                  this.handleInput(e.target.name, e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="email"
                placeholder="Email address"
                onChange={e =>
                  this.handleInput(e.target.name, e.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                placeholder="Password must be min. 6 characters"
                onChange={e =>
                  this.handleInput(e.target.name, e.target.value)
                }
              />
            </FormGroup> 
            <Button style={buttonStyle}>Sign Up</Button>
          </Form>
          <Link onClick={e => this.props.isLogin(e)}>Already a user? Log in here</Link>
        </div>
      </>
    );
  }
}

export default SignupForm;
