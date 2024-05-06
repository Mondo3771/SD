import React from "react";
import { Spinner } from "./Loader.styles";

const Loader = () => {
  return (
    <Spinner>
      <div className="center">
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

export default Loader;
