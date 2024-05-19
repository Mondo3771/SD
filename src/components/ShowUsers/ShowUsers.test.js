import React from "react";
import { render, screen } from "@testing-library/react";
import { ShowUsers } from "./ShowUsers";
import "@testing-library/jest-dom";

describe("ShowUsers", () => {
  const users = [
    {
      Department: "Accounting",
      EMP_type: "Manager",
      Emp_ID: 83,
      Name: "Kabelo",
      Surname: "Rankoane",
      token: "google-oauth2|104356444367191158010",
    },
    {
      Department: "HR",
      EMP_type: "Employee",
      Emp_ID: 84,
      Name: "John",
      Surname: "Doe",
      token: "google-oauth2|104356444367191158011",
    },
  ];

  test("renders users correctly", () => {
    render(<ShowUsers Users={users} />);

    users.forEach((user) => {
      const userElement = screen.getByText(`${user.Name} ${user.Surname}`);
      expect(userElement).toBeInTheDocument();
    });
  });

  test("calls onUserClick when a user is clicked", () => {
    const onUserClick = jest.fn();
    render(<ShowUsers Users={users} onUserClick={onUserClick} />);

    users.forEach((user) => {
      const userElement = screen.getByText(`${user.Name} ${user.Surname}`);
      userElement.click();
      expect(onUserClick).toHaveBeenCalledWith(user);
    });
  });
});
