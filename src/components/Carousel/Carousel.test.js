import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

describe("Carousel", () => {
  test("renders without errors", () => {
    render(<Carousel />);
    // Add your assertions here
  });

  test("displays loading spinner when data is not loaded", () => {
    render(<Carousel />);
    // Add your assertions here
  });

  test("displays menu items when data is loaded", () => {
    render(<Carousel />);
    // Add your assertions here
  });

  test("opens modal when a booking is clicked", () => {
    render(<Carousel />);
    // Add your assertions here
  });

  test("closes modal when modalOpen state is set to false", () => {
    render(<Carousel />);
    // Add your assertions here
  });

  // Add more tests as needed
});
