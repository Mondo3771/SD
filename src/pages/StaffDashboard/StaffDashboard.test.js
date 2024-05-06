import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import StaffDashboard from "./StaffDashboard";
import { Projects, add, deleteTask, pause } from "./StaffDashboard";
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
});
afterEach(() => {
  jest.clearAllMocks();
});

test("add function", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      data: {
        Task_ID: 34,
      },
    })
  );
  const setAllProjects = jest.fn();
  const taskToAdd = {
    Emp_ID: 1,
    Task_Name: "test",
    Time: 0,
  };
  const a = await add(taskToAdd, setAllProjects);
  // expect(setAllProjects).toHaveBeenCalled();
});
