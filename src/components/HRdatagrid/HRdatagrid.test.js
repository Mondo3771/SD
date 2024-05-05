import fetchMock from "jest-fetch-mock";
import React from "react";
import { updateEmp, fetchData, DELETEEmp } from "./HRdatagrid";
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

it("updateEmp makes a PUT request", async () => {
  fetchMock.mockResponseOnce(JSON.stringify("Success"));
  const parm = {
    row: {
      Emp_ID: 1,
      EMP_type: "Full Time",
    },
  };
  const params = await updateEmp(parm);
  console.log(params, "params");
  expect(params).toEqual("Success");
});

it("DELETEEmp makes a DELETE request", async () => {
  fetchMock.mockResponseOnce(JSON.stringify("Success"));
  const Emp_ID = 1;
  const params = await DELETEEmp(Emp_ID);
  expect(params).toEqual("Success");
});

it("fetchData makes a GET request", async () => {
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

it("Renders HRdatagrid", () => {
  render(
    <BrowserRouter>
      <HRdatagrid />
    </BrowserRouter>
  );
});
