//LoginButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = ({ child }) => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  if (!isAuthenticated) {
    return (
      <button
        className="btn btn-primary 
            mx-5 my-5 px-4"
        onClick={() => {
          loginWithRedirect();
          // child(user);
        }}
      >
        Log In
      </button>
    );
  }
  return null;
};

export default LoginButton;
