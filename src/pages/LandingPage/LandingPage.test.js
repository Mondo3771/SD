import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { act } from "react";
import "@testing-library/jest-dom";
// import { act } from "@testing-library/react";

describe("LandingPage", () => {
  test("renders login button", () => {
    render(<LandingPage />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  test("renders sign up button", () => {
    render(<LandingPage />);
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    expect(signUpButton).toBeInTheDocument();
  });

  test("clicking login button toggles login state", () => {
    render(<LandingPage />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("clicking sign up button toggles signup state", () => {
    render(<LandingPage />);
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    fireEvent.click(signUpButton);
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    fireEvent.click(signUpButton);
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  // Add more tests for other functionality in the LandingPage component
});
