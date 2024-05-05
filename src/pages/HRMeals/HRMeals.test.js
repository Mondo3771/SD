import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HRMeals from "./HRMeals";

test("renders HRMeals component", () => {
  render(<HRMeals />);
  // Add your assertions here
});

test("fetches meals and displays them", async () => {
  // Mock the fetch function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Meal_ID: 1,
              Name_of_Meal: "Meal 1",
              Description: "Description 1",
              Availability: true,
            },
            {
              Meal_ID: 2,
              Name_of_Meal: "Meal 2",
              Description: "Description 2",
              Availability: false,
            },
          ],
        }),
    })
  );

  render(<HRMeals />);

  // Wait for the meals to be loaded
  await waitFor(() => {
    expect(screen.getByText("Meal 1")).toBeInTheDocument();
    expect(screen.getByText("Meal 2")).toBeInTheDocument();
  });

  // Add your assertions here
});

test("creates a new meal", async () => {
  // Mock the fetch function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { Meal_ID: 3 },
        }),
    })
  );

  render(<HRMeals />);

  // Wait for the meals to be loaded
  await waitFor(() => {
    expect(screen.getByText("Create Meals")).toBeInTheDocument();
  });

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "New Meal" },
  });
  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { value: "New Description" },
  });
  fireEvent.click(screen.getByLabelText("Available"));

  // Click the create button
  fireEvent.click(screen.getByText("Create"));

  // Wait for the new meal to be added
  await waitFor(() => {
    expect(screen.getByText("New Meal")).toBeInTheDocument();
  });

  // Add your assertions here
});

test("views a meal and updates availability", async () => {
  // Mock the fetch function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {
            Meal_ID: 4,
            Name_of_Meal: "Meal 4",
            Description: "Description 4",
            Availability: true,
          },
        }),
    })
  );

  render(<HRMeals />);

  // Wait for the meals to be loaded
  await waitFor(() => {
    expect(screen.getByText("Meal 4")).toBeInTheDocument();
  });

  // Click on a meal
  fireEvent.click(screen.getByText("Meal 4"));

  // Wait for the meal details to be displayed
  await waitFor(() => {
    expect(screen.getByText("Meal 4")).toBeInTheDocument();
    expect(screen.getByText("Description: Description 4")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  // Toggle the availability
  fireEvent.click(screen.getByLabelText("Available"));

  // Wait for the availability to be updated
  await waitFor(() => {
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });

  // Add your assertions here
});

test("deletes a meal", async () => {
  // Mock the fetch function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: {},
        }),
    })
  );

  render(<HRMeals />);

  // Wait for the meals to be loaded
  await waitFor(() => {
    expect(screen.getByText("Meal 4")).toBeInTheDocument();
  });

  // Click on a meal
  fireEvent.click(screen.getByText("Meal 4"));

  // Wait for the meal details to be displayed
  await waitFor(() => {
    expect(screen.getByText("Meal 4")).toBeInTheDocument();
  });

  // Click the delete button
  fireEvent.click(screen.getByRole("button", { name: "Delete" }));

  // Wait for the meal to be deleted
  await waitFor(() => {
    expect(screen.queryByText("Meal 4")).not.toBeInTheDocument();
  });

  // Add your assertions here
});
