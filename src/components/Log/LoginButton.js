// Importing necessary libraries and components
import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Auth0 React SDK
import { clearStorage } from "../../helper"; // Helper function to clear storage
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"; // Icon from Heroicons

// LoginButton component definition
const LoginButton = ({ child }) => {
  // Destructuring necessary functions and variables from Auth0 hook
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  // If the user is not authenticated
  if (!isAuthenticated) {
    // Render a login button
    return (
      <button
        className="loginButton"
        onClick={() => {
          // On click, redirect the user to the login page
          loginWithRedirect({
            prompt: "consent",
          });
          // child(user); // This line is commented out and does nothing
        }}
        style={{
          // Styling for the button
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
  }
  // If the user is authenticated
  else if (isAuthenticated) {
    // Render a logout button
    return (
      <>
        <button
          onClick={() => {
            // On click, log the user out and clear the storage
            logout({ returnTo: window.location.origin });
            clearStorage();
          }}
          style={{
            // Styling for the button
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          <ArrowLeftStartOnRectangleIcon width={24} height={24} />{" "}
          {/* Logout icon */}
        </button>
        <br />
      </>
    );
  }
};

// Exporting the LoginButton component as the default export
export default LoginButton;
