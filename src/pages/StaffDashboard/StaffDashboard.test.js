import fetchMock from "jest-fetch-mock";
import React from "react";
import { Projects, add, pause, deleteTask } from "./StaffDashboard";
import StaffDashboard from "./StaffDashboard";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

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
  });

it()
