import React from "react";
import { render } from "@testing-library/react";
import HRHome from "./HRHome";

describe("HRHome", () => {
  it("renders the logo", () => {
    const { getByAltText } = render(<HRHome />);
    const logo = getByAltText("SYNERGY Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the navigation links", () => {
    const { getByText } = render(<HRHome />);
    const reportsLink = getByText("Reports");
    const mealsLink = getByText("Meals");
    const bookingsLink = getByText("Bookings");
    const carWashLink = getByText("Car Wash");
    const usersLink = getByText("Users");

    expect(reportsLink).toBeInTheDocument();
    expect(mealsLink).toBeInTheDocument();
    expect(bookingsLink).toBeInTheDocument();
    expect(carWashLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
  });

  it("renders the title", () => {
    const { getByText } = render(<HRHome />);
    const title = getByText("Manage Users");
    expect(title).toBeInTheDocument();
  });

  it("renders the HRdatagrid component", () => {
    const { getByTestId } = render(<HRHome />);
    const hrDataGrid = getByTestId("hrdatagrid");
    expect(hrDataGrid).toBeInTheDocument();
  });
});
