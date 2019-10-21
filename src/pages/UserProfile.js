import React, { Component } from "react";
import axios from "axios";

const imgStyle = {
  height: 150,
  margin: 10,
  border: 10,
  borderColor: "white"
};

class UserProfile extends Component {
  state = {
    images: [],
    userInfo: ""
  };

  componentDidMount = () => {
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.userId}`
      )
      .then(result => {
        console.log(result)
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
        console.log(result);
        this.setState({
          userInfo: result.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>{`@${this.state.userInfo.username}`}</h2>
        <img
          src={this.state.userInfo.profileImage}
          alt="profileImage"
          className="rounded-circle"
          style={imgStyle}
        />
        <div>
          {this.state.images.map((image, index) => (
            <img key={index} src={image} width="300" height="200" alt="userImages" />
          ))}
        </div>
      </div>
    );
  }
}

export default UserProfile;
