import React, { Component } from "react";
import Axios from "axios";

import UploadForm from "../components/UploadForm";
import PreviewImage from "../components/PreviewImage";

class UploadPage extends Component {
  state = {
    previewImage: "",
    imageFile: null,
    // message: ""
    isLoading: null
  };

  handleFile = file => {
    console.log(file);
    this.setState({
      previewImage: URL.createObjectURL(file),
      imageFile: file,
      message: ""
    });
  };

  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    this.setState({
      isLoading:true,
      previewImage:null
    },()=>this.handleUpload())
  };
  
  handleUpload=()=>{
    // create envelope
    let formData = new FormData();
    formData.append("image", this.state.imageFile);
    // get JWT token
    let headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    };
    Axios.post(
      `https://insta.nextacademy.com/api/v1/images/`,
      formData,
      headers
    )
      .then(result => {
        console.log(result);
        if (result.data.success) {
          this.setState({
            // previewImage: null,
            imageFile: null,
            isLoading: false,
            message: "Your image upload is a success!"
          });
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  
  render() {
    return (
      <>
        {/* <h1>Upload Images On This Page</h1> */}
        <PreviewImage
          previewImage={this.state.previewImage}
          message={this.state.message}
          isLoading={this.state.isLoading}
        />
        <UploadForm
          handleFile={this.handleFile}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default UploadPage;
