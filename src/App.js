import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./HomePage";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import LoadingIndicator from "./components/LoadingIndicator";

class App extends React.Component {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
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
        </Switch>
      </div>
    );
  }
}

export default App;
