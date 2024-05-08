import React from "react";
import { InfoContainer, User, Wrapper } from "./ShowUsers.styles";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const ShowUsers = ({ Users }) => {
  const handleClickUser = (user) => {
    console.log(user);
  };

  return (
    <>
      <h2>Users</h2>
      <Wrapper>
        {Users.map((user) => (
          <User className="User" key={user.Emp_ID} onClick={() => handleClickUser(user)}>
            <UserCircleIcon className="ProfileImage"></UserCircleIcon>

            <InfoContainer>
              <h2>
                {user.Name} {user.Surname}
              </h2>
              <h3>Department: {user.Department}</h3>
              <p>Employee Type: {user.EMP_Type}</p>
            </InfoContainer>
          </User>
        ))}
      </Wrapper>
    </>
  );
};
