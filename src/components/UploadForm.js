import React, { Component } from "react";
import { Form, FormGroup, Input, Button, FormText } from "reactstrap";

class UploadForm extends Component {
  state = {
    imageFile: null
  };

  handleChange = e => {
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    this.props.handleFile(file);
  };

  handleLoading = () => {

  }

  render() {
    return (
      <Form onSubmit={e => this.props.handleSubmit(e)}>
        <FormGroup>
          <Input type="file" onChange={e => this.handleChange(e)} />
          <FormText>Make sure your image is in a supported format</FormText>
        </FormGroup>
        <Button onClick={this.handleLoading()}>Upload</Button>
      </Form>
    );
  }
}

export default UploadForm;
