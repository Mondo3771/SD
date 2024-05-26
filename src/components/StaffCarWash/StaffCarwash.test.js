import React from "react";
import StaffCarWash from "./StaffCarWash";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
jest.mock("../../helper", () => ({
  ...jest.requireActual("../../helper"),
  fetchStorageData: () => Promise.resolve({ Emp_ID: "86" }),
}));

fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});
test("should render StaffCarWash component", async () => {
  const openModal = jest.fn();
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Car_wash: 2,
              date: "2022-09-09",
              Quatinity: 2,
            },
            {
              Car_wash: 1,
              date: "2022-05-27",
              Quatinity: 2,
            },
          ],
          message: "Successfully retrieved Cars",
        }),
    })
  );
  await act(async () => {
    render(<StaffCarWash onOpenModal={openModal} />);
  });

});
