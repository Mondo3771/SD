import React from "react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";

import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LandingNew from "./LandingNew";

test("renders LandingNew and checks dropdown", async () => {
  render(<LandingNew />);

  // Check if the "Features" and "About" elements are in the document
  expect(screen.getByText("Features")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();

  // Simulate mouse enter event on "Features" and "About"
  fireEvent.mouseEnter(screen.getByText("Features"));
  fireEvent.mouseEnter(screen.getByText("About"));

  // Wait for the dropdown to appear
  await waitFor(() => {
    expect(
      screen.getByText(
        "Keep track of the time spent on each task to improve productivity and efficiency. Easily monitor progress and identify areas for improvement."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Welcome to Synergy! We're dedicated to revolutionizing staff relations management and boosting productivity in your workplace. Our platform provides innovative tools for tracking task duration, generating timesheets, accessing detailed reports, and streamlining lunch meal bookings. With a user-friendly interface and powerful features, we aim to empower organizations to optimize their operations and enhance employee satisfaction. Join us on this journey to transform the way you manage your team and achieve greater success together."
      )
    ).toBeInTheDocument();
  });

  // Simulate mouse leave event on "Features" and "About"
  fireEvent.mouseLeave(screen.getByText("Features"));
  fireEvent.mouseLeave(screen.getByText("About"));

  // Wait for the dropdown to disappear
  await waitFor(() => {
    expect(
      screen.queryByText(
        "Keep track of the time spent on each task to improve productivity and efficiency. Easily monitor progress and identify areas for improvement."
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Welcome to Synergy! We're dedicated to revolutionizing staff relations management and boosting productivity in your workplace. Our platform provides innovative tools for tracking task duration, generating timesheets, accessing detailed reports, and streamlining lunch meal bookings. With a user-friendly interface and powerful features, we aim to empower organizations to optimize their operations and enhance employee satisfaction. Join us on this journey to transform the way you manage your team and achieve greater success together."
      )
    ).not.toBeInTheDocument();
  });
});

test("Login button redirects to /HRhome", () => {
  const history = createMemoryHistory();
  render(<LandingNew history={history} />);
});
fetchMock.enableMocks();
test("renders LandingNew and checks basic interactions", async () => {
  const { getByTestID } = render(<LandingNew />);
  const loginButton = screen.getByTestID("Login");
});
