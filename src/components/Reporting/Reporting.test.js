import Reporting from "./Reporting";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  // console.error = jest.fn();

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
  // console.error = originalError;
  jest.clearAllMocks();
});

test("fetches tasks and feedback data", async () => {
  // Mock the fetch function
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Task_ID: 337,
              Emp_ID: 83,
              Project: "Hello",
              Date: "2024-05-14T00:00:00.000Z",
              Description: "dads",
              Time: 102,
              Active: false,
            },
          ],
          message: "Successfully retrieved tasks",
        }),
    })
  );
  // global.fetch = jest.fn().mockImplementationOnce(() =>
  //   Promise.resolve({
  //     json: () =>
  //       Promise.resolve({
  //         data: [
  //           {
  //             Message_ID: 9,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2026-01-01T00:00:00.000Z",
  //             Message: "Well Done",
  //           },
  //           {
  //             Message_ID: 25,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-19T00:00:00.000Z",
  //             Message: "Nathan says Hey",
  //           },
  //           {
  //             Message_ID: 26,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-19T00:00:00.000Z",
  //             Message: "oihohiohoihooi",
  //           },
  //           {
  //             Message_ID: 27,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-19T00:00:00.000Z",
  //             Message: "Hello",
  //           },
  //           {
  //             Message_ID: 15,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-18T00:00:00.000Z",
  //             Message: "Good Job big man",
  //           },
  //           {
  //             Message_ID: 16,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-18T00:00:00.000Z",
  //             Message: "Good day",
  //           },
  //           {
  //             Message_ID: 17,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-18T00:00:00.000Z",
  //             Message: "wffwg",
  //           },
  //           {
  //             Message_ID: 18,
  //             Sent_ID: null,
  //             Receive_ID: 83,
  //             Date: "2024-05-18T00:00:00.000Z",
  //             Message: "Helllo",
  //           },
  //           {
  //             Message_ID: 7,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2015-08-11T00:00:00.000Z",
  //             Message: "See you soon",
  //           },
  //           {
  //             Message_ID: 6,
  //             Sent_ID: 84,
  //             Receive_ID: 83,
  //             Date: "2015-08-10T00:00:00.000Z",
  //             Message: "Good job",
  //           },
  //           {
  //             Message_ID: 5,
  //             Sent_ID: 84,
  //             Receive_ID: 83,
  //             Date: "2015-08-09T00:00:00.000Z",
  //             Message: "Hello there",
  //           },
  //           {
  //             Message_ID: 2,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2015-08-08T00:00:00.000Z",
  //             Message: "Well Done",
  //           },
  //           {
  //             Message_ID: 3,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2015-08-08T00:00:00.000Z",
  //             Message: "Godspeed to you",
  //           },
  //           {
  //             Message_ID: 4,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2015-08-08T00:00:00.000Z",
  //             Message: "Shut up bruv",
  //           },
  //           {
  //             Message_ID: 8,
  //             Sent_ID: 83,
  //             Receive_ID: 84,
  //             Date: "2015-01-01T00:00:00.000Z",
  //             Message: "Well Done",
  //           },
  //         ],
  //         message: "Successfully retrieved Messages",
  //       }),
  //   })
  // );

  await act(async () => {
    render(<Reporting User={{ Emp_ID: 83, Name: "John" }} />);
  });
});
