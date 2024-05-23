//LoginButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { clearStorage } from "../../helper";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
const LoginButton = ({ child }) => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  if (!isAuthenticated) {
    return (
      <button
      className="loginButton"
        onClick={() => {
          loginWithRedirect({
            prompt: "consent",
          });
          // child(user);
        }}
        style={{
          borderRadius: "20px",
          color: "var(--darkest)",
          height: "5vh",
          width: "10vw",
          background: "transparent",
          color: "white",
          border: "solid var(--white) 3px",
          cursor: "pointer",

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
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none'

          }}
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none'

          }}
        >
          <ArrowLeftStartOnRectangleIcon width={24} height={24}/>
        </button>
        <br />
      </>
    );
  }
};

export default LoginButton;
