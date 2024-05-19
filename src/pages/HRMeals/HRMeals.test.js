import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HRMeals from "./HRMeals";
import { act } from "@testing-library/react";

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
  // await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  // expect(fetch).toHaveBeenCalledWith("/api/CreateMeals");
  screen.debug();
});

