import React from "react";
import { MemoryRouter } from "react-router-dom";
import StaffDashboard from "./StaffDashboard";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
test("renders StaffDashboard with a location", () => {
  const state = {
    params: {
      Emp_ID: 40,
    },
  };
  render(
    <MemoryRouter initialEntries={[{ pathname: "/", state }]}>
      <StaffDashboard />
    </MemoryRouter>
  );

  // your assertions here
});

test("renders StaffDashboard and checks if Create a task button is present", () => {
  render(<StaffDashboard />);
  const createTaskButton = screen.getByText("Create a task");
  expect(createTaskButton).toBeInTheDocument();
});

test('clicking "Create a task" button shows input fields', async () => {
  render(<StaffDashboard />);
  const createTaskButton = screen.getByText("Create a task");
  fireEvent.click(createTaskButton);

  await waitFor(() => {
    expect(screen.getByPlaceholderText("project name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("task name")).toBeInTheDocument();
  });
});
