import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const LogoutButton = ({ child }) => {
  const { logout, isAuthenticated, user } = useAuth0();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return (
      <>
        <button
          className="btn btn-primary 
                    mx-5 my-5 px-4 logoutBtn"
          onClick={() => {
            logout({ returnTo: window.location.origin });
            // child(user);
          }}
        >
          Log Out
        </button>
        <br />
        <Profile />
      </>
    );
  }
  return null;
};

export default LogoutButton;
