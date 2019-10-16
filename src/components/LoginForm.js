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

class LoginForm extends Component {
  state = {
    name: "",
    password: ""
  };

  handleInput = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <div className="d-flex flex-column p-2" style={formStyle}>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <h2>Log In</h2>
            <Button style={buttonStyle}>Sign in with Google</Button>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username or email address"
                onChange={event =>
                  this.handleInput(event.target.name, event.target.value)
                }
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="password"
                placeholder="Password"
                onChange={event =>
                  this.handleInput(event.target.name, event.target.value)
                }
              />
            </FormGroup>
            <Button style={buttonStyle}>Sign Up</Button>
          </Form>
          <Link onClick={event => this.props.isLogin(event)}>
            Don't have an account yet? Sign up now
          </Link>
        </div>
      </>
    );
  }
}

export default LoginForm;
