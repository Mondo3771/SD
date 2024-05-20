import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeAll(async () => {
  jest.mock('swiper/react', () => {
  return {
    Swiper: () => <div>Mock Swiper</div>,
    SwiperSlide: () => <div>Mock SwiperSlide</div>,
  };
});
  fetch.mockResponse(
    JSON.stringify({
      data: [
        {
          Meal: "Pizza",
          Meal_ID: 1,
          Description:
            "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
          Allergens: "Contains Milk",
          Date: "20/03/2121",
          Available: true,
        },
        {
          Meal: "burger",
          Meal_ID: 2,
          Date: "21/03/2121",
          Available: true,
          Description:
            "A garden on a crust! Fresh veggies atop a bed of melted mozzarella, drizzled with our secret sauce. Dive into a slice of freshness today!",
          Allergens: "Contains Milk",
        },
      ],
    })
  );
  render(<Carousel />);
});

describe("Carousel", () => {
  test("renders without errors", () => {
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    // Add your assertions here
  });

  test("displays loading spinner when data is not loaded", () => {
    // Add your assertions here
  });

  test("displays menu items when data is loaded", () => {
  });

  test("opens modal when a booking is clicked", () => {
    // Add your assertions here
  });

  test("closes modal when modalOpen state is set to false", () => {
    // Add your assertions here
  });

  // Add more tests as needed
});
