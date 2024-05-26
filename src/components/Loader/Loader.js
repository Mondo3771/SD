// Importing the React library from the 'react' package
import React from "react";

// Importing the Spinner component from the 'Loader.styles' file
import { Spinner } from "./Loader.styles";

// Defining a functional React component named 'Loader'
const Loader = () => {
  // The component returns a Spinner component that wraps a div with the class name 'center'
  return (
    <Spinner>
      <div className="center">
        {/* Inside this div, there are ten other div elements with the class name 'wave' */}
        {/* These div elements are likely used to create a loading animation, with each 'wave' representing a part of the animation */}
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </Spinner>
  );
};

// Exporting the Loader component as the default export from this module
export default Loader;
