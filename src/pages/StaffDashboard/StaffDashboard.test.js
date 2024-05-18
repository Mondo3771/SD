import React from "react";
import { render, screen, fireEvent,act } from "@testing-library/react";
import StaffDashboard from "./StaffDashboard";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/test-path",
    search: "?query=test",
    hash: "#hash",
    state: { params: "some params" },
  }),
}));

beforeEach(() => {
  fetchMock.resetMocks();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "/test-path",
      search: "?query=test",
      hash: "#hash",
      state: { params: "some params" },
    }),
  }));
});
afterEach(() => {
  jest.clearAllMocks();
});

test("renders StaffDashboard", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Yeah",
          data: [],
        }),
    })
  );
  await act(async () => {
    render(<StaffDashboard />);
  });
});
