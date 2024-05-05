import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import StaffDashboard from "./StaffDashboard";
import { Projects, add, deleteTask, pause } from "./StaffDashboard";

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
  fetchMock.mockResponseOnce(JSON.stringify("Success"));
  const setAllProjects = jest.fn();
  const taskToAdd = {
    Emp_ID: 1,
    Task_Name: "test",
    Time: 0,
  };
  const a = await add(taskToAdd, setAllProjects);
  expect(setAllProjects).toHaveBeenCalled();
});

test("updateEmp makes a PUT request", async () => {
  fetchMock.mockResponseOnce(JSON.stringify("Success"));
  const parm = {
    row: {
      Emp_ID: 1,
      EMP_type: "Full Time",
    },
  };
  const params = await updateEmp(parm);
  // console.log(params, "params");
  expect(params).toEqual("Success");
});
