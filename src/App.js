import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import HomePage from "./HomePage";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";

class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    currentUser: { loggedIn: false }
  };

  componentDidMount() {
    let user = localStorage.getItem('userData')
    if(user === true) {
      user = JSON.parse(user);
      this.setState({
        currentUser: {...user, loggedIn: true}
      })
    }
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        this.setState({
          isLoading: false,
          users: result.data.slice(0, 5)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
        // localStorage.setItem('userToken' JWT); // stores auth token in my local storage
        localStorage.setItem("userData", JSON.stringify(result.data.user));
        this.setState({
          // currentUser:
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
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
        </Switch>
      </div>
    );
  }
}

export default App;
