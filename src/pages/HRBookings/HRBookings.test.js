import React from "react";
import { render, screen } from "@testing-library/react";
import HRBookings from "./HRBookings";

test("renders HRBookings component", () => {
  render(<HRBookings />);

  // Assert that the logo is rendered
  const logoElement = screen.getByRole("img");
  expect(logoElement).toBeInTheDocument();

  // Assert that the "SYNERGY" link is rendered
  const synergyLink = screen.getByText("SYNERGY");
  expect(synergyLink).toBeInTheDocument();

  // Assert that the "Reports" link is rendered
  const reportsLink = screen.getByText("Reports");
  expect(reportsLink).toBeInTheDocument();

  // Assert that the "Meals" link is rendered
  const mealsLink = screen.getByText("Meals");
  expect(mealsLink).toBeInTheDocument();

  // Assert that the "Bookings" link is rendered
  const bookingsLink = screen.getByText("Bookings");
  expect(bookingsLink).toBeInTheDocument();

  // Assert that the "Car Wash" link is rendered
  const carWashLink = screen.getByText("Car Wash");
  expect(carWashLink).toBeInTheDocument();

  // Assert that the "Users" link is rendered
  const usersLink = screen.getByText("Users");
  expect(usersLink).toBeInTheDocument();

  // Assert that the "Manage Users" heading is rendered
  const manageUsersHeading = screen.getByRole("heading", { level: 2 });
  expect(manageUsersHeading).toBeInTheDocument();

  // Assert that the HRBookingsGrid component is rendered
  const hrBookingsGrid = screen.getByTestId("hr-bookings-grid");
  expect(hrBookingsGrid).toBeInTheDocument();
});
