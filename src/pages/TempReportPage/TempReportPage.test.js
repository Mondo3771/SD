import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TempReportPage } from "./TempReportPage";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../helper", () => ({
  ...jest.requireActual("../../helper"),
  fetchStorageData: () => ({ Emp_ID: "86" }),
}));
fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders TempReportPage with feedback", async () => {
  fetchMock.mockResponse(
    JSON.stringify({
      Message: "Yeah",
      data: [
        {
          Message: "Feedback 1",
          Sent_ID: "86",
          Receive_ID: "87",
          Date: "2022-01-01",
          Message_ID: 1,
        },
        {
          Message: "Feedback 2",
          Sent_ID: "87",
          Receive_ID: "86",
          Date: "2022-01-02",
          Message_ID: 2,
        },
      ],
    })
  );

  // fetchMock.mockResponseOnce(
  //   JSON.stringify({
  //     Message: "Yeah",
  //     data: [
  //       {
  //         Emp_ID: "87",
  //         Department: "IT",
  //       },
  //       {
  //         Emp_ID: "88",
  //         Department: "IT",
  //       },
  //     ],
  //   })
  // );
  await act(async () => {
    render(<TempReportPage />);
  });
});
