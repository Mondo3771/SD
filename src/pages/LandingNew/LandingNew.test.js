import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  getByTestId,
} from "@testing-library/react";

import LandingNew from "./LandingNew";
import { useGoogleLogin } from "react-use-googlelogin";
import { renderHook } from "@testing-library/react-hooks";
import { useHistory } from "react-router-dom";

const GoogleAuth = () => {
  const { signIn, loaded } = useGoogleLogin({
    clientId: "your-google-client-id",
  });

  if (!loaded) {
    return null;
  }

  return <button onClick={signIn}>Sign in with Google</button>;
};

describe("LandingNew", () => {
  test("renders landing page with logo and heading", () => {
    render(<LandingNew />);
    const logoElement = screen.getByAltText("logo");
    const headingElement = screen.getByText("SYNERGY");
    expect(logoElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
  });

  test('toggles dropdown when "Features" is hovered', () => {
    render(<LandingNew />);
    const featuresElement = screen.getByText("Features");
    fireEvent.mouseEnter(featuresElement);
    const dropdownElement = screen.getByTestId("dropdown_Features");
    expect(dropdownElement).toBeInTheDocument();
    fireEvent.mouseLeave(featuresElement);
    expect(dropdownElement).not.toBeInTheDocument();
  });

  test('toggles dropdown when "About" is hovered', () => {
    render(<LandingNew />);
    const aboutElement = screen.getByText("About");
    fireEvent.mouseEnter(aboutElement);
    const dropdownElement = screen.getByTestId("dropdown_About");
    expect(dropdownElement).toBeInTheDocument();
    fireEvent.mouseLeave(aboutElement);
    expect(dropdownElement).not.toBeInTheDocument();
  });
});
import { login } from "./LandingNew"; // replace with your module's import

test("login function", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "No user found" }),
    })
  );
  const data = {
    email: "test@example.com",
    sub: "1234567890",
    given_name: "John",
    family_name: "Doe",
  };
//   const [loading, setLoading] = React.useState(false);
  await login(data,setLoading);

  expect(fetch).toHaveBeenCalledWith(
    "/api/login?Email=email&Token=token",
    expect.anything()
  );
});
import { get } from "./LandingNew"; // replace with your module's import

// Mock data
const data = {
  email: "test@example.com",
  sub: "1234567890",
  given_name: "John",
  family_name: "Doe",
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: data }),
  })
);
// Mock history
const history = { push: jest.fn() };

// Mock setLoaded
const setLoaded = jest.fn();

test("get function", async () => {
  await get(data);

  expect(fetch).toHaveBeenCalledWith(
    "/api/login",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Department: null,
        EMP_type: "Staff",
        Email: data.email,
        Name: data.given_name,
        Surname: data.family_name,
        Token: data.sub,
      }),
    })
  );

  expect(setLoaded).toHaveBeenCalledWith(true);
  expect(history.push).toHaveBeenCalledWith("/DashBoard", {
    params: "mock data",
  });
});
