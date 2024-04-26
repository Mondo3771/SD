import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StaffDashboard from "./StaffDashboard";

describe("StaffDashboard", () => {
  test("renders create task button", () => {
    render(<StaffDashboard />);
    const createTaskButton = screen.getByRole("button", {
      name: "Create a task",
    });
    expect(createTaskButton).toBeInTheDocument();
  });

  test("clicking create task button shows create task form", () => {
    render(<StaffDashboard />);
    const createTaskButton = screen.getByRole("button", {
      name: "Create a task",
    });
    userEvent.click(createTaskButton);
    const projectNameInput = screen.getByPlaceholderText("project name");
    const taskNameInput = screen.getByPlaceholderText("task name");
    expect(projectNameInput).toBeInTheDocument();
    expect(taskNameInput).toBeInTheDocument();
  });

  test("adding a task updates the task list", () => {
    render(<StaffDashboard />);
    const createTaskButton = screen.getByRole("button", {
      name: "Create a task",
    });
    userEvent.click(createTaskButton);
    const projectNameInput = screen.getByPlaceholderText("project name");
    const taskNameInput = screen.getByPlaceholderText("task name");
    const addButton = screen.getByRole("button", { name: "Add task" });

    userEvent.type(projectNameInput, "Project 1");
    userEvent.type(taskNameInput, "Task 1");
    userEvent.click(addButton);

    const project1 = screen.getByText("Project 1");
    const task1 = screen.getByText("Task 1");
    expect(project1).toBeInTheDocument();
    expect(task1).toBeInTheDocument();
  });

  // Add more tests for other functionality in the StaffDashboard component
});
