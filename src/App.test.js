import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "./App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  // check if LandingNew component renders on '/'
  expect(screen.getByText(/landingnew component text/i)).toBeInTheDocument();

  // navigate to '/DashBoard'
  history.push("/DashBoard");
  // check if StaffDashboard component renders on '/DashBoard'
  expect(
    screen.getByText(/staffdashboard component text/i)
  ).toBeInTheDocument();

  // navigate to '/HRhome'
  history.push("/HRhome");
  // check if HRHome component renders on '/HRhome'
  expect(screen.getByText(/hrhome component text/i)).toBeInTheDocument();
});
