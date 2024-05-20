import React from "react";

jest.mock("../../components/Carousel/Carousel", () => {
  return function DummyCarousel(props) {
    return <div data-testid="Carousel"></div>;
  };
});
import { render, screen } from "@testing-library/react";
import StaffBookings from "./StaffBookings";

test("StaffBookings renders correctly", () => {

  render(<StaffBookings />);
});
