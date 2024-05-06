import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import fecthmock from "jest-fetch-mock";
let mockFetch;

beforeEach(() => {
  mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({}),
  }));
});

afterEach(() => {
  mockFetch.mockClear();
});
describe("Modal", () => {
    beforeEach(() => {
        fetch.mockClear();
      });
  test("renders modal with correct data", () => {
    const setOpenModal = jest.fn();
    const data = {
      Name_of_Meal: "Test Meal",
      Description: "Test Description",
    };
    const employee = {
      Emp_ID: 1,
    };
    const booking = false;

    render(
      <Modal
        setOpenModal={setOpenModal}
        data={data}
        employee={employee}
        booking={booking}
      />
    );

    // expect(screen.getByText("Test Meal")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Description: Test Description")
    // ).toBeInTheDocument();
    expect(screen.getByText("Confirm Booking")).toBeInTheDocument();
  });

  test("calls setOpenModal with false when close button is clicked", () => {
    const setOpenModal = jest.fn();
    const data = {
      Name_of_Meal: "Test Meal",
      Description: "Test Description",
    };
    const employee = {
      Emp_ID: 1,
    };
    const booking = false;

    render(
      <Modal
        setOpenModal={setOpenModal}
        data={data}
        employee={employee}
        booking={booking}
      />
    );

    fireEvent.click(screen.getByText("X"));

    expect(setOpenModal).toHaveBeenCalledWith(false);
  });

  test("calls confirmBooking and setOpenModal with false when Confirm Booking button is clicked", () => {
    const setOpenModal = jest.fn();
    const data = {
      Name_of_Meal: "Test Meal",
      Description: "Test Description",
      Meal_ID: 1,
    };
    const employee = {
      Emp_ID: 1,
    };
    const booking = false;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ book: "mocked book" }),
      })
    );
    render(
      <Modal
        setOpenModal={setOpenModal}
        data={data}
        employee={employee}
        booking={booking}
      />
    );

    fireEvent.click(screen.getByText("Confirm Booking"));

    expect(fetch).toHaveBeenCalledWith("/api/Meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Emp_ID: 1,
        Meal_ID: 1,
        Date_of_Booking: expect.any(String),
      }),
    });
    // fetch.mockResponseOnce(JSON.stringify({}));
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });
});
