import React from "react";
import { render, screen, waitFor} from "@testing-library/react";
import HRBookingsGrid from "./HRBookingsGrid";
import fetchMock from "jest-fetch-mock";
import { fetchData, formatDate } from "./HRBookingsGrid";
import '@testing-library/jest-dom';
fetchMock.enableMocks();

test("fetchData function", async () => {
  const setallBookings = jest.fn();
  const setLoaded = jest.fn();
  const mockData = {
    data: [
      {
        id: 1,
        name: "Chicken Salad",
        status: 1,
        description: "Chicken, Lettuce, Tomatoes, Dressing",
      },
      {
        id: 3,
        name: "Pasta Alfredo",
        status: 0,
        description: "Pasta, Alfredo Sauce, Chicken",
      },
      {
        id: 4,
        name: "Beef Steak",
        status: 1,
        description: "Beef, Potatoes, Vegetables",
      },
      {
        id: 5,
        name: "Fish Tacos",
        status: null,
        description: "Fish, Tortillas, Cabbage, Sauce",
      },
      {
        id: 6,
        name: "Chicken Soup",
        status: 1,
        description: "Chicken, Vegetables, Broth",
      },
      {
        id: 7,
        name: "Chicken Soup",
        status: 1,
        description: "Chicken, Vegetables, Broth",
      },
      {
        id: 8,
        name: "Chicken Soup",
        status: 1,
        description: "Chicken, Vegetables, Broth",
      },
      {
        id: 115,
        name: "Chicken Tikka",
        status: 0,
        description: "Chicken tikka Masala from Woolworths",
      },
      {
        id: 116,
        name: "Pizza",
        status: null,
        description: "Romans creamy chicken pizza",
      },
    ],
  };

  fetch.mockResponseOnce(JSON.stringify(mockData));

  fetchData(setallBookings, setLoaded);

  // Wait for the fetch to resolve
  await waitFor(() => expect(fetch).toHaveBeenCalled());

  // Check that the fetch function was called with the correct URL
  expect(fetch).toHaveBeenCalledWith("/api/Bookings");

  // Check that the setallBookings and setLoaded functions were called with the correct arguments
  expect(setallBookings).toHaveBeenCalledWith(
    mockData.data.map((b, index) => {
      let temp = b;
      temp["Date_of_booking"] = temp["Date_of_booking"]
        ? formatDate(temp["Date_of_booking"])
        : "Null";
      return { ...temp, id: index + 1 };
    })
  );
  expect(setLoaded).toHaveBeenCalledWith(true);
});
test("formatDate function", () => {
  const date = "2022-03-01T00:00:00";
  const expected = "2022-03-01";

  const result = formatDate(date);

  expect(result).toEqual(expected);
});
test("fetches and displays bookings data", async () => {
  // Mock the fetch function
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Booking_ID: 1,
              Emp_ID: 123,
              Meal_ID: 456,
              Date_of_booking: "2022-01-01",
            },
            {
              Booking_ID: 2,
              Emp_ID: 456,
              Meal_ID: 789,
              Date_of_booking: "2022-01-02",
            },
          ],
        }),
    })
  );

  render(<HRBookingsGrid />);

  // Wait for the data to be fetched and displayed
  await screen.findByText("Booking_ID");
  await screen.findByText("123");

  // Check if the data is displayed correctly
  expect(screen.getByText("Booking_ID")).toBeInTheDocument();
  expect(screen.getByText("123")).toBeInTheDocument();

  // Restore the original fetch function
  global.fetch.mockRestore();
});
