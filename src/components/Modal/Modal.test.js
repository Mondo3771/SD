import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

test("Render Modal Meal", async () => {
  const data = {
    Meal_ID: 1,
    Name_of_Meal: "Burger",
    Quantity: 1,
    Date_of_Booking: "2024-05-14",
    Description: "Tasty",
  };
  const setactoin = jest.fn();
  const setOpenModal = jest.fn();
  const { debug } = render(
    <Modal
      setOpenModal={setOpenModal}
      data={data}
      employee={{ Emp_ID: 83 }}
      booking={false}
      setActionTriggered={setactoin}
    />
  );
  //   debug();
  const confirmBooking = screen.getByLabelText("Confirm");

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Successfully retrieved tasks",
        }),
    })
  );
  await act(async () => {
    fireEvent.click(confirmBooking);
  });

  debug();
});

test("Render Modal Carwash", async () => {
  const data = {
    Car_wash: 1,
    Quantity: 1,
    Date: "2024-05-14",
  };
  const setactoin = jest.fn();
  const setOpenModal = jest.fn();
  const { debug } = render(
    <Modal
      setOpenModal={setOpenModal}
      data={data}
      employee={{ Emp_ID: 83 }}
      booking={false}
      setActionTriggered={setactoin}
    />
  );
  //   debug();
  const confirmBooking = screen.getByLabelText("Confirm");

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Successfully retrieved tasks",
        }),
    })
  );
  await act(async () => {
    userEvent.click(confirmBooking);
  });
});

test("Render Modal Already booked", async () => {
  const data = {
    Car_wash: 1,
    Quantity: 1,
    Date: "2024-05-14",
  };
  const setactoin = jest.fn();
  const setOpenModal = jest.fn();
  const { debug } = render(
    <Modal
      setOpenModal={setOpenModal}
      data={data}
      employee={{ Emp_ID: 83 }}
      booking={true}
      setActionTriggered={setactoin}
    />
  );
  //   debug();
  const close = screen.getByLabelText("Close");
  expect(screen.getByText("You already have a booking")).toBeInTheDocument();

  await act(async () => {
    userEvent.click(close);
  });
});

test("Render Modal Meal", async () => {
  const data = {
    Meal_ID: 1,
    Name_of_Meal: "Burger",
    Quantity: 0,
    Date_of_Booking: "2024-05-14",
    Description: "Tasty",
  };
  const setactoin = jest.fn();
  const setOpenModal = jest.fn();
  const { debug } = render(
    <Modal
      setOpenModal={setOpenModal}
      data={data}
      employee={{ Emp_ID: 83 }}
      booking={false}
      setActionTriggered={setactoin}
    />
  );
});
