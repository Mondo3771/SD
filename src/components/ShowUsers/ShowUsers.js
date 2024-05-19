import React from "react";
import { InfoContainer, User, Wrapper } from "./ShowUsers.styles";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const ShowUsers = ({ Users, onUserClick }) => {
  console.log("Users",Users)

  return (
  
      <Wrapper>
        {Users.map((user) => (
          <User className="User" key={user.Emp_ID} onClick={() => onUserClick(user)}>
            <UserCircleIcon className="ProfileImage"></UserCircleIcon>

            <InfoContainer>
              <h2>
                {user.Name} {user.Surname}
              </h2>
              <h3>Department: {user.Department}</h3>
              <p>Employee Type: {user.EMP_type}</p>
            </InfoContainer>
          </User>
        ))}
      </Wrapper>
  );
};
