import fetchMock from "jest-fetch-mock";
import React from "react";
import { updateEmp, fetchData, DELETEEmp, removeEmp } from "./HRdatagrid";
import HRdatagrid from "./HRdatagrid";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
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
          ],
        }),
    })
  );
  await act(async () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { params: { Emp_ID: 1 } } }]}
      >
        <HRdatagrid />
      </MemoryRouter>
    );
  });
  // screen.debug(undefined, 100000);
  // Assuming each row has a unique 'row_id' displayed, find the row by its 'row_id'
  const row = document.querySelector("[data-id=1]"); // replace 'row_id_to_test' with the actual row_id
  const save_changes = screen.getByLabelText("Update_icon_1");
  const empTypeCell = row.querySelector('[data-field="EMP_type"]');
  const departmentCell = row.querySelector('[data-field="Department"]');

  const DeleteButton = screen.getByLabelText("delete_icon_1");
  await act(async () => {
    userEvent.dblClick(departmentCell);
    const input = await screen.findByRole("textbox");
    userEvent.type(input, "New Department");
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
            data: [
              {
                Department: "New Department",
                EMP_type: "Manager",
                Emp_ID: 83,
                Name: "Kabelo",
                Surname: "Rankoane",
                token: "google-oauth2|104356444367191158010",
              },
            ],
          }),
      })
    );
    userEvent.click(save_changes);
  });
  await act(async () => {
    userEvent.dblClick(empTypeCell);
    const dropdown = await screen.findByRole("listbox");
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
            data: [
              {
                Department: "New Department",
                EMP_type: "Manager",
                Emp_ID: 83,
                Name: "Kabelo",
                Surname: "Rankoane",
                token: "google-oauth2|104356444367191158010",
              },
            ],
          }),
      })
    );
    userEvent.click(screen.getAllByText("Manager")[1]);

    // userEvent.click(screen.getByLabelText("report_icon_1"));
  });
  await act(async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
          }),
      })
    );
    userEvent.click(DeleteButton);
  });
});
