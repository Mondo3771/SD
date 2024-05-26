import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeedBack } from "./FeedBack";

describe("FeedBack component", () => {
  const mockFeedBackArray = [
    {
      Message_ID: 1,
      Sent_ID: 1,
      Send_Name: "John",
      Message: "Hello",
      Date: "2022-01-01T00:00:00.000Z",
    },
    {
      Message_ID: 2,
      Sent_ID: 2,
      Send_Name: "Jane",
      Message: "Hi",
      Date: "2022-01-02T00:00:00.000Z",
    },
  ];

  const mockUser = {
    Emp_ID: 1,
  };

  const mockReceiver = {
    Emp_ID: 2,
  };

  const mockSendFeedBack = jest.fn();

  beforeEach(() => {
    render(
      <FeedBack
        FeedBackArray={mockFeedBackArray}
        User={mockUser}
        Receiver={mockReceiver}
        onSendFeedBack={mockSendFeedBack}
      />
    );
  });
  test("should render FeedBack component", () => {
    const { debug } = render(
      <FeedBack
        FeedBackArray={mockFeedBackArray}
        User={mockUser}
        Receiver={mockReceiver}
        onSendFeedBack={mockSendFeedBack}
      />
    );

    
  });
});