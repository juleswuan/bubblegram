import React, { Component } from "react";
import axios from "axios";

const imgStyle = {
  height: 150,
  margin: 10,
  border: 10,
  borderColor: "white"
};

class MyProfilePage extends Component {
  state = {
    username: "",
    profileImage: "",
    images: []
  };

  componentDidMount = () => {
    let headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    };
    console.log(headers);
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/me`, headers)
      .then(result => {
        console.log(result);
        this.setState({
          username: result.data.username,
          profileImage: result.data.profile_picture
        });
      })
      .catch(error => {
        console.log(error.response);
      });

    axios
      .get(`https://insta.nextacademy.com/api/v1/images/me`, headers)
      .then(result => {
        console.log(result);
        this.setState({
          images: result.data
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <>
        <h1>My Profile Page</h1>
        <h2>{`@${this.state.username}`}</h2>
        <img
          src={this.state.profileImage}
          alt="profileImage"
          className="rounded-circle"
          style={imgStyle}
        />
        <div>
          {this.state.images.map((image, index) => (
            <img key={index} src={image} width="300" height="" alt="userImages" />
          ))}
        </div>
      </>
    );
  }
}

export default MyProfilePage;
