import React from "react";
import { render, screen } from "@testing-library/react";
import HRBookings from "./HRBookings";
import "@testing-library/jest-dom/extend-expect";

// Add this if a file needs to use another component that we are cyrrently not testinh

jest.mock("../../pages/HRBookings/HRBookingsGrid", () => {
  return function DummyHRBookingGrid(props) {
    return <div data-testid="HRBookingsGrid"></div>;
  };
});
afterAll(() => {
  jest.unmock("../../pages/HRBookings/HRBookingsGrid");
});


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
  const hrBookingsGrid = screen.getByTestId("HRBookingsGrid");
  expect(hrBookingsGrid).toBeInTheDocument();
});
