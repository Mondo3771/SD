import fetchMock from "jest-fetch-mock";
import React from "react";
import { updateEmp, fetchData, DELETEEmp, removeEmp } from "./HRdatagrid";
import HRdatagrid from "./HRdatagrid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
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

test("should render HRdatagrid with no users", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Yeah",
          data: [],
          // Add Tasks here
        }),
    })
  );
  await act(async () => {
    const { debug } = render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { params: { Emp_ID: 1 } } }]}
      >
        <HRdatagrid />
      </MemoryRouter>
    );
    debug();
  });
});

test("should render HRdatagrid with users", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Yeah",
          data: [
            {
              Department: "Accounting",
              EMP_type: "Manager",
              Emp_ID: 83,
              Name: "Kabelo",
              Surname: "Rankoane",
              token: "google-oauth2|104356444367191158010",
            },
            {
              Department: "HR",
              EMP_type: "Staff",
              Emp_ID: 84,
              Name: "Mondo",
              token: "google-oauth2|108823478247906648302",
            },
          ],
          // Add Tasks here
        }),
    })
  );
  await act(async () => {
    const { debug } = render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { params: { Emp_ID: 1 } } }]}
      >
        <HRdatagrid />
      </MemoryRouter>
    );
    debug();
  });
});
