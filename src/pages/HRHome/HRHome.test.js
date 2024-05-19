import React from "react";
import { render, screen } from "@testing-library/react";
import HRHome from "./HRHome";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";

// Import the actual component

// Mock the component
afterAll(() => {
  jest.unmock("../../components/HRdatagrid/HRdatagrid");
});
// Now, whenever HRdatagrid is used in your tests, the dummy component will be rendered instead.
test("renders HRHome component", async () => {
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
            data: [
              {
                Meal_ID: 1,
                Name_of_Meal: "Meal 1",
                Description: "Description 1",
                Availability: true,
              },
            ],
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
            data: [
              {
                Department: "Accounting",
                EMP_type: "Manager",
                Emp_ID: 83,
                Name: "Kabelo",
                Surname: "Rankoane",
                token: "google-oauth2|104356444367191158010",
              },
            ],
          }),
      })
    );

  await act(async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { params: { Emp_ID: 1 } } }]}
      >
        <HRHome />
      </MemoryRouter>
    );
  });
  // Check if the navigation links are rendered
  screen.debug();
  const bookingsLink = screen.getByText("Bookings");
  expect(bookingsLink).toBeInTheDocument();
  const usersLink = screen.getByText("Users");
  expect(usersLink).toBeInTheDocument();

  // Check if the title is rendered
  const title = screen.getByText("Manage Users");
  expect(title).toBeInTheDocument();
});
