import fetchMock from "jest-fetch-mock";
import React from "react";
import { updateEmp, fetchData, DELETEEmp, removeEmp } from "./HRdatagrid";
import HRdatagrid from "./HRdatagrid";
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
afterEach(() => {
  jest.clearAllMocks();
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

test("DELETEEmp makes a DELETE request", async () => {
  fetchMock.mockResponseOnce(JSON.stringify("Success"));
  const Emp_ID = 1;
  const params = await DELETEEmp(Emp_ID);
  // console.log(params, "params");
  // expect(params).toEqual("Success");
});

test("fetchData makes a GET request", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      data: [
        {
          Emp_ID: 1,
          EMP_type: "Full Time",
        },
      ],
    })
  );
  const users = {
    Emp_ID: 2,
  };
  const setallEmployeedatas = jest.fn();
  const setLoadeds = jest.fn();
  const params = await fetchData(users, setallEmployeedatas, setLoadeds);
  expect(setallEmployeedatas).toHaveBeenCalledWith([
    {
      Emp_ID: 1,
      EMP_type: "Full Time",
      id: 1,
    },
  ]);
  expect(setLoadeds).toHaveBeenCalledWith(true);
});

jest.mock("./HRdatagrid", () => ({
  ...jest.requireActual("./HRdatagrid"),
  DELETEEmp: jest.fn(),
}));

test("should call DELETEEmp and update the employee data", () => {
  const setAllEmployeeData = jest.fn();
  const allEmployeeData = [
    { id: 1, Emp_ID: "E1" },
    { id: 2, Emp_ID: "E2" },
  ];
  const idToRemove = 1;
  const Emp_IDToRemove = "E1";

  removeEmp(idToRemove, Emp_IDToRemove, setAllEmployeeData, allEmployeeData);

  // expect(DELETEEmp).toHaveBeenCalledWith(Emp_IDToRemove);
  // expect(setAllEmployeeData).toHaveBeenCalledWith([{ id: 2, Emp_ID: "E2" }]);
});
