import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders the loader component", () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector(".center");
    expect(loaderElement).toBeInTheDocument();
  });

  test("renders the spinner component", () => {
    const { container } = render(<Loader />);
    const spinnerElement = container.querySelector("Spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("renders 10 wave elements", () => {
    const { container } = render(<Loader />);
    const waveElements = container.querySelectorAll(".wave");
    expect(waveElements.length).toBe(10);
  });
});
