import React, { Component } from 'react';
import LoadingGif from "../assets/Ripple.svg"

const LoadingIndicator = () => {
    return ( 
      <div className="d-flex justify-content-center">
      <img src={LoadingGif} alt="loading" className="w-25" />
    </div>
     );
  }
 
export default LoadingIndicator;