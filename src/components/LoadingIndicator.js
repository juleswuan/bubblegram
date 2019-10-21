import React from 'react';
import LoadingGif from "../assets/Ellipsis-1.2s-200px.svg"

const LoadingIndicator = () => {
    return ( 
      <div className="d-flex justify-content-center">
      <img src={LoadingGif} alt="loading" className="w-25" />
    </div>
     );
  }
 
export default LoadingIndicator;