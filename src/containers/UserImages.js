import React from "react";
import Axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";

export default class UserImages extends React.Component {
  state = {
    images: [],
    loading: true
  };

  componentDidMount() {
    Axios.get(
      `https://localhost:5000/api/v1/images?userId=${this.props.userId}`
    )
      .then(({ data }) => {
        this.setState({
          images: data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="row">
        {this.state.loading ? (
          <LoadingIndicator />
        ) : (
          this.state.images.map((url, index) => (
            <img
              key={index}
              className="p-1"
              src={url}
              width="200"
              height="150"
              alt=""
            />
          ))
        )}
      </div>
    );
  }
}
