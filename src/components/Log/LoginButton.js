//LoginButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { clearStorage } from "../../helper";
const LoginButton = ({ child }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  if (!isAuthenticated) {
    return (
      <button
        onClick={() => {
          loginWithRedirect();
          // child(user);
        }}
      >
        Log In
      </button>
    );
  } else if (isAuthenticated) {
    return (
      <>
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
            clearStorage();
          }}
        >
          Log Out
        </button>
        <br />
      </>
    );
  }
};

export default LoginButton;
