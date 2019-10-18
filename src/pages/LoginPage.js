import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

class LoginPage extends Component {
  state = {
    showLogin: true
  };

  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  };

  render() {
    // console.log("LoginPage props", this.props);

    return (
      <>
        {this.state.showLogin ? (
          <LoginForm toggleLogin={this.toggleLogin} history={this.props.history} />
        ) : (
          <SignupForm
            toggleLogin={this.toggleLogin}
            signUpNewUser={this.props.signUpNewUser}
          />
        )}
      </>
    );
  }
}

export default LoginPage;


