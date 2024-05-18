import React from "react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/Log/LoginButton";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { useHistory } from "react-router-dom";

// Your component's tests here
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LandingNew from "./LandingNew";
fetchMock.enableMocks();

test("renders LandingNew and checks dropdown", async () => {
  const mockLoginWithRedirect = jest.fn();
  const mockLogout = jest.fn();
  const mockUser = { name: "Test User" };

  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    user: {},
  });
  render(<LandingNew />);

  // Check if the "Features" and "About" elements are in the document
  expect(screen.getByText("Features")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();

  // Simulate mouse enter event on "Features" and "About"
  fireEvent.mouseEnter(screen.getByText("Features"));
  fireEvent.mouseEnter(screen.getByText("About"));

  // Wait for the dropdown to appear
  await waitFor(() => {
    expect(
      screen.getByText(
        "Keep track of the time spent on each task to improve productivity and efficiency. Easily monitor progress and identify areas for improvement."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Welcome to Synergy! We're dedicated to revolutionizing staff relations management and boosting productivity in your workplace. Our platform provides innovative tools for tracking task duration, generating timesheets, accessing detailed reports, and streamlining lunch meal bookings. With a user-friendly interface and powerful features, we aim to empower organizations to optimize their operations and enhance employee satisfaction. Join us on this journey to transform the way you manage your team and achieve greater success together."
      )
    ).toBeInTheDocument();
  });

  // Simulate mouse leave event on "Features" and "About"
  fireEvent.mouseLeave(screen.getByText("Features"));
  fireEvent.mouseLeave(screen.getByText("About"));

  // Wait for the dropdown to disappear
  await waitFor(() => {
    expect(
      screen.queryByText(
        "Keep track of the time spent on each task to improve productivity and efficiency. Easily monitor progress and identify areas for improvement."
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        "Welcome to Synergy! We're dedicated to revolutionizing staff relations management and boosting productivity in your workplace. Our platform provides innovative tools for tracking task duration, generating timesheets, accessing detailed reports, and streamlining lunch meal bookings. With a user-friendly interface and powerful features, we aim to empower organizations to optimize their operations and enhance employee satisfaction. Join us on this journey to transform the way you manage your team and achieve greater success together."
      )
    ).not.toBeInTheDocument();
  });
});

jest.mock("@auth0/auth0-react");

test("clicks login button and returns with Authenticated user", () => {
  const mockLoginWithRedirect = jest.fn();
  const mockLogout = jest.fn();
  const mockGEttoken = jest.fn();
  const mockUser = { name: "Test User" };

  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    getAccesTokenSilently: mockGEttoken,
    user: {},
  });

  const { rerender } = render(<LoginButton />);
  const loginButton = screen.getByText("Log In");
  fireEvent.click(loginButton);

  expect(mockLoginWithRedirect).toHaveBeenCalled();

  useAuth0.mockReturnValue({
    isAuthenticated: true,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    user: mockUser,
  });

  rerender(<LoginButton />);

  const logoutButton = screen.getByText("Log Out");
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);

  expect(mockLogout).toHaveBeenCalled();
});

test("clicks login button and returns with Authenticated user", () => {
  const mockLoginWithRedirect = jest.fn();
  const mockLogout = jest.fn();
  const mockUser = { name: "Test User" };

  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    user: {},
  });

  const { rerender } = render(<LoginButton />);
  const loginButton = screen.getByText("Log In");
  fireEvent.click(loginButton);

  expect(mockLoginWithRedirect).toHaveBeenCalled();

  useAuth0.mockReturnValue({
    isAuthenticated: true,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    user: mockUser,
  });

  rerender(<LoginButton />);

  const logoutButton = screen.getByText("Log Out");
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);

  expect(mockLogout).toHaveBeenCalled();
});

test("If user is authenticated and exists then checks the Data type and it is Staff", async () => {
  const mockUser = { sub: "1234" };
  const mockLogin = jest.fn();
  const mockget = jest.fn();
  const mockgetToken = jest.fn().mockResolvedValue("mocked_token");
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    getAccessTokenSilently: mockgetToken, // corrected here
    user: mockUser,
  });
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Mocked response 1",
            data: { EMP_type: "Staff" },
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Mocked response 2" }), // dont need this
      })
    );
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));
  await act(async () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
  });
});


test("If user is authenticated and exists then checks the Data type and it is HR", async () => {
  const mockUser = { sub: "1234" };
  const mockLogin = jest.fn();
  const mockget = jest.fn();
  const mockgetToken = jest.fn().mockResolvedValue("mocked_token");
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    getAccessTokenSilently: mockgetToken, // corrected here
    user: mockUser,
  });
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Mocked response 1",
            data: { EMP_type: "HR" },
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Mocked response 2" }), // dont need this
      })
    );
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));
  await act(async () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
  });
});


test("If user is authenticated and exists then checks the Data type and it is Staff", async () => {
  const mockUser = { sub: "1234" };
  const mockLogin = jest.fn();
  const mockget = jest.fn();
  const mockgetToken = jest.fn().mockResolvedValue("mocked_token");
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    getAccessTokenSilently: mockgetToken, // corrected here
    user: mockUser,
  });
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "No user found",
            data: { EMP_type: "Staff" },
          }),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Mocked response 2" }), // dont need this
      })
    );
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));
  await act(async () => {
    render(
      <BrowserRouter>
        <LandingNew />
      </BrowserRouter>
    );
  });
});