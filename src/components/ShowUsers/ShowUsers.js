// Importing necessary libraries and components
import React from "react";
import { InfoContainer, User, Wrapper } from "./ShowUsers.styles"; // Styled components
import { UserCircleIcon } from "@heroicons/react/24/outline"; // User icon from Heroicons

// ShowUsers component definition
export const ShowUsers = ({ Users, onUserClick }) => {
  // Rendering a Wrapper component
  return (
    <Wrapper>
      {/* Mapping over the Users array and creating a User component for each user */}
      {Users.map((user) => (
        <User
          className="User" // Setting the class name for styling
          key={user.Emp_ID} // Unique key for each User component (required by React)
          onClick={() => onUserClick(user)} // Calling onUserClick function when the User component is clicked
        >
          <UserCircleIcon className="ProfileImage"></UserCircleIcon>{" "}
          {/* User icon */}
          {/* Container for user information */}
          <InfoContainer>
            <h2>
              {user.Name} {user.Surname} {/* User's name and surname */}
            </h2>
            <h3>Department: {user.Department}</h3> {/* User's department */}
            <p>Employee Type: {user.EMP_type}</p> {/* User's employee type */}
          </InfoContainer>
        </User>
      ))}
    </Wrapper>
  );
};
