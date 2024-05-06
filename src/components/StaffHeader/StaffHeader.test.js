import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import StaffHeader from "./StaffHeader";

test("StaffHeader renders correctly", () => {
  render(<StaffHeader employee={{ name: "John Doe" }} />);

  // Assert that the logo is rendered
  const logoElement = screen.getByAltText("SYNERGY Logo");
  expect(logoElement).toBeInTheDocument();

  // Assert that the Home link is rendered
  const homeLink = screen.getByText("Home");
  expect(homeLink).toBeInTheDocument();

  // Assert that the Reports link is rendered
  const reportsLink = screen.getByText("Reports");
  expect(reportsLink).toBeInTheDocument();

  // Assert that the Lunch link is rendered
  const lunchLink = screen.getByText("Lunch");
  expect(lunchLink).toBeInTheDocument();
});

test("Clicking on Home link navigates to Dashboard", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <StaffHeader employee={{ name: "John Doe" }} />
    </Router>
  );

  // Simulate clicking on the Home link
  const homeLink = screen.getByText("Home");
  fireEvent.click(homeLink);

  // Assert that the URL has changed to "/Dashboard"
  expect(history.location.pathname).toBe("/Dashboard");
});

test("Clicking on Lunch link navigates to Lunch page", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <StaffHeader employee={{ name: "John Doe" }} />
    </Router>
  );

  // Simulate clicking on the Lunch link
  const lunchLink = screen.getByText("Lunch");
  fireEvent.click(lunchLink);

  // Assert that the URL has changed to "/Lunch"
  expect(history.location.pathname).toBe("/Lunch");
});
