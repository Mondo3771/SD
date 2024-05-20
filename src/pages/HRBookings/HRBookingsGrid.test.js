import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import HRBookingsGrid from "./HRBookingsGrid";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

fetchMock.enableMocks();
const mockData = {
  AllUsers: JSON.stringify("Mocked User Data"),
  Meals: JSON.stringify([
    {
      Meal_ID: 1,
      Name_of_Meal: "Chicken Salad",
      Availability: true,
      Description: "Chicken, Lettuce, Tomatoes, Dressing",
    },
    {
      Meal_ID: 6,
      Name_of_Meal: "Chicken Soup",
      Availability: false,
      Description: "Chicken, Vegetables, Broth",
    },
    {
      Meal_ID: 7,
      Name_of_Meal: "Chicken Soup",
      Availability: true,
      Description: "Chicken, Vegetables, Broth",
    },
    {
      Meal_ID: 8,
      Name_of_Meal: "Chicken Soup",
      Availability: false,
      Description: "Chicken, Vegetables, Broth",
    },
    {
      Meal_ID: 115,
      Name_of_Meal: "Chicken Tikka",
      Availability: true,
      Description: "Chicken tikka Masala from Woolworths ",
    },
    {
      Meal_ID: 118,
      Name_of_Meal: "Lasagna",
      Availability: true,
      Description: "delicous",
    },
    {
      Meal_ID: 138,
      Name_of_Meal: "butternut soup",
      Availability: true,
      Description: "butternut, cream, bread",
    },
  ]),
};
jest.mock("../../helper", () => ({
  fetchStorageData: jest.fn(({ key }) => {
    return JSON.parse(mockData[key]);
  }),
}));

// Now in your tests, fetchStorageData({ key: "AllUsers" }) will return "Mocked User Data"

test("renders HRBookingsGrid component and deletes", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      message: "Yeah",
      data: [
        {
          Booking_ID: 97,
          Date_of_booking: "2024-05-16",
          EMP_type: "HR",
          Emp_ID: 85,
          Meal: "Chicken Soup",
          Meal_ID: 8,
          Name: "Kabelo Mojalefa",
          Surname: "Rankoane",
        },
        {
          Booking_ID: 143,
          Date_of_booking: "2024-05-18",
          EMP_type: "HR",
          Emp_ID: 85,
          Meal: "Chicken Salad",
          Meal_ID: 1,
          Name: "Kabelo Mojalefa",
          Surname: "Rankoane",
        },
        {
          Booking_ID: 146,
          Date_of_booking: "2024-05-18",
          EMP_type: "HR",
          Emp_ID: 85,
          Meal: "Chicken Salad",
          Meal_ID: 1,
          Name: "Kabelo Mojalefa",
          Surname: "Rankoane",
        },
        {
          Booking_ID: 178,
          Date_of_booking: "2024-05-20",
          EMP_type: "HR",
          Emp_ID: 85,
          Meal: "Chicken Salad",
          Meal_ID: 1,
          Name: "Kabelo Mojalefa",
          Surname: "Rankoane",
        },
        {
          Booking_ID: 192,
          Date_of_booking: "2024-05-19",
          EMP_type: "Manager",
          Emp_ID: 87,
          Meal: "Chicken Salad",
          Meal_ID: 1,
          Name: "Nathan",
          Surname: "Joseph",
        },
      ],
    })
  );
  fetchMock.mockResponseOnce(
    JSON.stringify({
      message: "Yeah",
      data: [
        {
          Department: "Accounting",
          EMP_type: "Manager",
          Emp_ID: 85,
          Name: "Kabelo",
          Surname: "Rankoane",
          token: "google-oauth2|104356444367191158010",
        },
      ],
    })
  );

  await act(async () => {
    render(<HRBookingsGrid />);
  });
  // screen.debug();
  const deleteButton = screen.getByLabelText("delete_icon_1");
  expect(deleteButton).toBeInTheDocument();
  fetchMock.mockResponseOnce(
    JSON.stringify({
      message: "Yeah",
    })
  );
  await act(async () => {
    userEvent.click(deleteButton);
  });
});
