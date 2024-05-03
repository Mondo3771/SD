import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingNew from "./LandingNew";

describe("LandingNew", () => {
  test("renders landing page with logo and heading", () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
    const logoElement = screen.getByAltText("logo");
    const headingElement = screen.getByText("SYNERGY");
    expect(logoElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test('toggles dropdown when "Features" is hovered', () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
    const featuresElement = screen.getByText("Features");
    fireEvent.mouseEnter(featuresElement);
    const dropdownElement = screen.getByTestId("dropdown_Features");
    expect(dropdownElement).toBeInTheDocument();
    fireEvent.mouseLeave(featuresElement);
    expect(dropdownElement).not.toBeInTheDocument();
  });

  test('toggles dropdown when "About" is hovered', () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
    const aboutElement = screen.getByText("About");
    fireEvent.mouseEnter(aboutElement);
    const dropdownElement = screen.getByTestId("dropdown_About");
    expect(dropdownElement).toBeInTheDocument();
    fireEvent.mouseLeave(aboutElement);
    expect(dropdownElement).not.toBeInTheDocument();
  });
});
