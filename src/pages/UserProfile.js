import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  state = {
    images: [],
    userName: ""
  };

  componentDidMount = () => {
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.userId}`
      )
      .then(result => {
        this.setState({
          images: result.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/${this.props.match.params.userId}`
      )
      .then(result => {
        this.setState({
          userName: result.data.username
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {userName} = this.state
    return (
      <div>
        <h2 >{`@ ${userName}`}</h2>
        <div>
          {this.state.images.map((image, index) => (
            <img key={index} src={image} width="300" height="200" alt="" />
          ))}
        </div>
      </div>
    );
  }
}

export default UserProfile;
