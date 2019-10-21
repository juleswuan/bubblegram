import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator"

// general styling
const Container = styled.section`
  border: 1px solid;
  border-color: salmon;
  padding: 10px;
  width: 50vw;
  height: 60vh;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PreviewImage = props => {
  return (
    <>
      <Container placeholder="Preview image here">
    {props.isLoading 
      ? <LoadingIndicator /> 
      : props.previewImage 
        ? ( <Img src={props.previewImage} width="50%" height="50%" /> ) 
        : ( <h3 className="text-center">
            {props.message ? props.message : "Live Preview"}
          </h3> )
    }
      </Container>
    </>
  );
};

export default PreviewImage;
