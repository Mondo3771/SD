import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TempReportPage } from "./TempReportPage";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../helper", () => ({
    ...jest.requireActual("../../helper"),
    fetchStorageData: () => Promise.resolve({ Emp_ID: "83" }),
}));

test("renders TempReportPage with no task", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Message_ID: 9,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2026-01-01T00:00:00.000Z",
              Message: "Well Done",
            },
            {
              Message_ID: 25,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-19T00:00:00.000Z",
              Message: "Nathan says Hey",
            },
            {
              Message_ID: 26,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-19T00:00:00.000Z",
              Message: "oihohiohoihooi",
            },
            {
              Message_ID: 27,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-19T00:00:00.000Z",
              Message: "Hello",
            },
            {
              Message_ID: 15,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-18T00:00:00.000Z",
              Message: "Good Job big man",
            },
            {
              Message_ID: 16,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-18T00:00:00.000Z",
              Message: "Good day",
            },
            {
              Message_ID: 17,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-18T00:00:00.000Z",
              Message: "wffwg",
            },
            {
              Message_ID: 18,
              Sent_ID: null,
              Receive_ID: 83,
              Date: "2024-05-18T00:00:00.000Z",
              Message: "Helllo",
            },
            {
              Message_ID: 7,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2015-08-11T00:00:00.000Z",
              Message: "See you soon",
            },
            {
              Message_ID: 6,
              Sent_ID: 84,
              Receive_ID: 83,
              Date: "2015-08-10T00:00:00.000Z",
              Message: "Good job",
            },
            {
              Message_ID: 5,
              Sent_ID: 84,
              Receive_ID: 83,
              Date: "2015-08-09T00:00:00.000Z",
              Message: "Hello there",
            },
            {
              Message_ID: 2,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2015-08-08T00:00:00.000Z",
              Message: "Well Done",
            },
            {
              Message_ID: 3,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2015-08-08T00:00:00.000Z",
              Message: "Godspeed to you",
            },
            {
              Message_ID: 4,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2015-08-08T00:00:00.000Z",
              Message: "Shut up bruv",
            },
            {
              Message_ID: 8,
              Sent_ID: 83,
              Receive_ID: 84,
              Date: "2015-01-01T00:00:00.000Z",
              Message: "Well Done",
            },
          ],
          message: "Successfully retrieved Messages",
        }),
    })
  );

  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: [
            {
              Emp_ID: 83,
              Department: "Accounting",
              EMP_type: "Staff",
              token: "google-oauth2|104356444367191158010",
              Name: "Kabelo",
              Surname: "Rankoane",
            },
            {
              Emp_ID: 84,
              Department: "Finance",
              EMP_type: "Manager",
              token: "google-oauth2|108823478247906648302",
              Name: "Mondo",
            },
            {
              Emp_ID: 85,
              Department: "HR",
              EMP_type: "HR",
              token: "windowslive|fc8a564f032702ea",
              Name: "Kabelo Mojalefa",
              Surname: "Rankoane",
            },
            {
              Emp_ID: 87,
              Department: "IT",
              EMP_type: "Manager",
              token: "google-oauth2|108143094304467200150",
              Name: "Nathan",
              Surname: "Joseph",
            },
            {
              Emp_ID: 88,
              Department: "Finance",
              EMP_type: "HR",
              token: "google-oauth2|110268954859451740612",
              Name: "Nathan",
              Surname: "Joseph",
            },
            {
              Emp_ID: 89,
              Department: "HR",
              EMP_type: "HR",
              token: "google-oauth2|106930633004636558314",
              Name: "Tholwana",
              Surname: "Seboni",
            },
            {
              Emp_ID: 90,
              Department: "Finance",
              EMP_type: "Staff",
              token: "google-oauth2|104216057008840146031",
              Name: "Teekay",
              Surname: "Seboni",
            },
            {
              Emp_ID: 95,
              Department: "HR",
              EMP_type: "HR",
              token: "google-oauth2|103347596905743041374",
              Name: "Tapiwa",
              Surname: "Mazarura",
            },
            {
              Emp_ID: 96,
              Department: "HR",
              EMP_type: "HR",
              token: "windowslive|4fb70a2fe71800c7",
              Name: "Tapiwa",
              Surname: "Mazarura",
            },
            {
              Emp_ID: 100,
              Department: "IT",
              EMP_type: "Manager",
              token: "google-oauth2|117604033210378294446",
              Name: "Tapiwa",
              Surname: "Mazarura",
            },
          ],
          message: "Successfully retrieved employees",
        }),
    })
  );


    await act(async () => {
        render(<TempReportPage />);
    });

});
