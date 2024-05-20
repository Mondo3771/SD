import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HRMeals from "./HRMeals";
import { act } from "@testing-library/react";
import { MealCard } from "./HRMeals.styles";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

global.fetch = require("jest-fetch-mock");
fetch.enableMocks();

test("renders HRMeals component", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
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
    })
  );
  await act(async () => {
    render(<HRMeals />);
  });
  const mealCard = screen.getByTestId("MealCard-1");
  expect(mealCard).toBeDefined();
});

test("Create a meal", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      data: [
        {
          Meal_ID: 1,
          Name_of_Meal: "Meal 1",
          Description: "Description 1",
          Availability: true,
        },
      ],
    })
  );
  await act(async () => {
    render(<HRMeals />);
  });
  const Name_of_Meal = screen.getByLabelText("Name of meal");
  const Description = screen.getByLabelText("Description of Meal");
  const addMealButton = screen.getByLabelText("Create Meal");
  const Available = screen.getByLabelText("Available");

  userEvent.type(Name_of_Meal, "Meal 2");
  userEvent.type(Description, "Description 2");

  userEvent.click(Available);

  await act(async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          Meal_ID: 2,
          Name_of_Meal: "Meal 2",
          Description: "Description 2",
          Availability: false,
        },
      })
    );
    userEvent.click(addMealButton);
  });
  const mealCard = screen.getByTestId("MealCard-2");
  expect(mealCard).toBeDefined();
});


test("Delete a meal", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      data: [
        {
          Meal_ID: 1,
          Name_of_Meal: "Meal 1",
          Description: "Description 1",
          Availability: true,
        },
      ],
    })
  );
  await act(async () => {
    render(<HRMeals />);
  });
  const mealCard = screen.getByTestId("MealCard-1");
  fireEvent.click(mealCard);

  const deleteButton = screen.getByLabelText("Delete Button");
  await act(async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          Meal_ID: 1,
          Name_of_Meal: "Meal 1",
          Description: "Description 1",
          Availability: true,
        },
      })
    );
    userEvent.click(deleteButton);
  });
  const meal = screen.queryByTestId("MealCard-1");
  expect(meal).toBeNull();
});

test("Change availability of a meal", async () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      data: [
        {
          Meal_ID: 1,
          Name_of_Meal: "Meal 1",
          Description: "Description 1",
          Availability: true,
        },
      ],
    })
  );
  await act(async () => {
    render(<HRMeals />);
  });
  const mealCard = screen.getByTestId("MealCard-1");
  fireEvent.click(mealCard);

  const availableCheckbox = screen.getByLabelText("Change Available");
  await act(async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          Meal_ID: 1,
          Name_of_Meal: "Meal 1",
          Description: "Description 1",
          Availability: false,
        },
      })
    );
    userEvent.click(availableCheckbox);
  });
  const meal = screen.getByTestId("MealCard-1");
  expect(meal).toBeDefined();
});