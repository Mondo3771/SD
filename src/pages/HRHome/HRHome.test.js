import React from "react";
import { render, screen } from "@testing-library/react";
import HRHome from "./HRHome";

describe("HRHome", () => {
  test("renders logo and heading", () => {
    render(<HRHome />);
    const logoElement = screen.getByAltText("logo");
    const headingElement = screen.getByText("SYNERGY");
    expect(logoElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<HRHome />);
    const reportsLink = screen.getByText("Reports");
    const mealsLink = screen.getByText("Meals");
    const bookingsLink = screen.getByText("Bookings");
    const carWashLink = screen.getByText("Car Wash");
    const usersLink = screen.getByText("Users");
    expect(reportsLink).toBeInTheDocument();
    expect(mealsLink).toBeInTheDocument();
    expect(bookingsLink).toBeInTheDocument();
    expect(carWashLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
  });

  test("renders title", () => {
    render(<HRHome />);
    const titleElement = screen.getByText("Manage Users");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders HRdatagrid component", () => {
    render(<HRHome />);
    const HRdatagridElement = screen.getByTestId("hrdatagrid");
    expect(HRdatagridElement).toBeInTheDocument();
  });
});
