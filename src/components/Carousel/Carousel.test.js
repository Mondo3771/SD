import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Carousel from "./Carousel";
import fetchMock from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
// import { act } from "react-dom/test-utils";
// import "@testing-library/jest-dom/extend-expect";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});
afterEach(() => {
  // console.error = originalError;
  jest.clearAllMocks();
});

jest.mock("../../helper", () => ({
  ...jest.requireActual("../../helper"),
  fetchStorageData: () => Promise.resolve({ Emp_ID: "86" }),
}));

test("renders without errors", async () => {

  // global.fetch = jest.fn().mockImplementation(() =>
  //   Promise.resolve({
  //     json: () =>
  //       Promise.resolve({
  //         data: [],
  //         message: "Successfully retrieved Meals",
  //       }),
  //   })
  // );
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Meal_ID: 1,
              Name_of_Meal: "Chicken Salad",
              Availability: true,
              Description: "Chicken, Lettuce, Tomatoes, Dressing",
            },
            {
              Meal_ID: 6,
              Name_of_Meal: "Chicken Soup",
              Availability: true,
              Description: "Chicken, Vegetables, Broth",
            },
            {
              Meal_ID: 7,
              Name_of_Meal: "Chicken Soup",
              Availability: true,
              Description: "Chicken, Vegetables, Broth",
            },
            {
              Meal_ID: 115,
              Name_of_Meal: "Chicken Tikka",
              Availability: true,
              Description: "Chicken tikka Masala from Woolworths ",
            },
            {
              Meal_ID: 138,
              Name_of_Meal: "butternut soup",
              Availability: true,
              Description: "butternut, cream, bread",
            },
            {
              Meal_ID: 140,
              Name_of_Meal: "Chicken Biryani",
              Availability: true,
              Description:
                "Chicken Biryani in rice with gara-masala and tandoori samoosas.",
            },
            {
              Meal_ID: 141,
              Name_of_Meal: "Chicken Biryani",
              Availability: true,
              Description: "Tikka masala flavored chicken.",
            },
          ],
          message: "Successfully retrieved meals",
        }),
    })
  );


  const MockComponent = (props) => {
    return <div data-testid="mockComponent">{props.children}</div>;
  };

  const openModal = jest.fn();

  await act(async () => {
    render(<Carousel onOpenModal={openModal} component={<MockComponent />} />);
  });
  // Add your assertions here
  screen.debug();
  const delteButton = screen.getAllByText("Cancel");
  await act(async () => {
    fireEvent.click(delteButton[0]);
  });
  // Add your assertions here
});
