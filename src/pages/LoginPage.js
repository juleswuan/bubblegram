import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

class LoginPage extends Component {
  state = {
    isLogin: true
  };

  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState({
  //     isLogin: this.props.location.state.isLogin
  //   });
  // }

  toggleLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin
    })
  };

  render() {
    return (
      <>
        {this.state.isLogin ? (
          <LoginForm isLogin={this.toggleLogin} />
        ) : (
          <SignupForm
            isLogin={this.toggleLogin}
            signUpNewUser={this.props.signUpNewUser}
          />
        )}
      </>
    );
  }
}

export default LoginPage;
