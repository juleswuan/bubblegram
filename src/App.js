import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import MyProfilePage from "./pages/MyProfilePage";
import UploadPage from "./pages/UploadPage";

class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    currentUser: { loggedIn: false } // use this state to toggle Log In / Log Out button in NavBar
    // firstLoad: true
  };

  componentDidMount() {
    // get current user data from local storage
    // and update a new currentUser object that merges the user object and the new currenUser state
    let user = localStorage.getItem("userData");
    if (user === true) {
      user = JSON.parse(user);
      this.setState({
        currentUser: { ...user, loggedIn: true }
      });
    }
    axios
      .get("http://localhost:5000/api/v1/users")
      .then(result => {
        console.log(result);
        this.setState({
          isLoading: false,
          users: result.data
          // firstLoad: false
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  // sign up new user
  signUpNewUser = (newUsername, newEmail, newPassword) => {
    // console.log(username, email, password);
    axios
      .post("https://insta.nextacademy.com/api/v1/users/", {
        username: newUsername,
        email: newEmail,
        password: newPassword
      })
      .then(result => {
        console.log(result);
        let JWT = result.data.auth_token; // pass auth token from returned data
        console.log(JWT);
        localStorage.setItem("userToken", JWT); // stores auth token in my local storage
        localStorage.setItem("userData", JSON.stringify(result.data.user));
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    // if (this.state.firstLoad) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div>
        <NavBar />
        <Switch>
          {/* there will only ever be one child here */}
          <Route
            exact
            path="/"
            component={() => {
              return (
                <HomePage
                  users={this.state.users}
                  isLoading={this.state.isLoading}
                  handleClick={this.handleClick}
                />
              );
            }}
          />
          <Route
            path="/users/:userId"
            component={props => {
              return <UserProfile {...props} />;
            }}
          />
          <Route
            path="/login"
            component={props => {
              return (
                <LoginPage {...props} signUpNewUser={this.signUpNewUser} />
              );
            }}
          />
          <Route
            path="/profile"
            component={props => {
              return <MyProfilePage {...props} />;
            }}
          />
          <Route
            path="/upload"
            component={props => {
              return <UploadPage {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
