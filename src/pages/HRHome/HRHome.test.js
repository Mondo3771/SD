import React from "react";
import { render, screen } from "@testing-library/react";
import HRHome from "./HRHome";

test("renders HRHome component", () => {
  render(<HRHome />);

  // Check if the logo is rendered
  const logo = screen.getByAltText("SYNERGY Logo");
  expect(logo).toBeInTheDocument();

  // Check if the navigation links are rendered
  const reportsLink = screen.getByText("Reports");
  expect(reportsLink).toBeInTheDocument();

  const mealsLink = screen.getByText("Meals");
  expect(mealsLink).toBeInTheDocument();

  const bookingsLink = screen.getByText("Bookings");
  expect(bookingsLink).toBeInTheDocument();

  const carWashLink = screen.getByText("Car Wash");
  expect(carWashLink).toBeInTheDocument();

  const usersLink = screen.getByText("Users");
  expect(usersLink).toBeInTheDocument();

  // Check if the title is rendered
  const title = screen.getByText("Manage Users");
  expect(title).toBeInTheDocument();

  // Check if the HRdatagrid component is rendered
  const hrDataGrid = screen.getByTestId("hrDataGrid");
  expect(hrDataGrid).toBeInTheDocument();
});
