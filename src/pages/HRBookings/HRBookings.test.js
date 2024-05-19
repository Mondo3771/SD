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

  // Assert that the "Bookings" link is rendered
  const bookingsLink = screen.getByText("Bookings");
  expect(bookingsLink).toBeInTheDocument();

  // Assert that the "Users" link is rendered
  const usersLink = screen.getByText("Users");
  expect(usersLink).toBeInTheDocument();

});
