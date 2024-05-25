import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import StaffDashboard from "./StaffDashboard";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

// Import the function you're testing
import { fetchStorageData } from '../../helper'; // replace with actual module

// Mock the function
jest.mock('../../helper', () => ({
  ...jest.requireActual('../../helper'),
  fetchStorageData: () => Promise.resolve({ Emp_ID: '86' }),
  
}));

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

// Save the original console.error
test("renders StaffDashboard with no task", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Yeah",
          data: [],
        }),
    })
  );
  await act(async () => {
    render(<StaffDashboard />);
  });
});

test("renders StaffDashboard with Task", async () => {
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
    render(<StaffDashboard />);
  });
});

test("Adding a Task", async () => {
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
  let debug;
  await act(async () => {
    const { debug } = render(<StaffDashboard />);
  });
  const createTaskButton = screen.getByLabelText("Create Task Button");

  fireEvent.click(createTaskButton);
  let addTaskButton, Project, Task;
  await waitFor(async () => {
    expect(screen.getByLabelText("Add Task")).toBeInTheDocument();
    addTaskButton = screen.getByLabelText("Add Task");
    Project = screen.getByLabelText("Project Place Holder");
    Task = screen.getByLabelText("Task Name Place Holder");
    await userEvent.type(Project, "Projects", { delay: 1 });
    await userEvent.type(Task, "Tasks");

    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Yeah",
            data: {
              Task_ID: 0,
              Emp_ID: 0,
              Project: "Project",
              Description: "SD",
              Acitve: true,
              Time: 0,
            },
          }),
      })
    );
  });
  await act(async () => {
    fireEvent.click(addTaskButton);
  });
  // screen.debug();
  expect(screen.getByText("Tasks")).toBeInTheDocument();
  expect(screen.getByText("Projects")).toBeInTheDocument();
});

test("Play, Pause, Stop and Delete Button", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Yeah",
          data: [
            {
              Active: false,
              Date: "2024-05-14T00:00:00.000Z",
              Description: "dads",
              Emp_ID: 83,
              Project: "Hello",
              Task_ID: 337,
              Time: 0,
            },
          ],
        }),
    })
  );
  let debug;
  await act(async () => {
    const { debug } = render(<StaffDashboard />);
    // debug();
  });
  const playButton = screen.getByLabelText("Play Button");
  const pauseButton = screen.getByLabelText("Pause Button");
  const stopButton = screen.getByLabelText("Stop Button")
  const DeleteButton = screen.getByLabelText("Delete Button")
  // fireEvent.click(playButton);

  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          message: "Pause",
        }),
    })
  );
  fireEvent.click(playButton);
  fireEvent.click(pauseButton);
  global.fetch = jest.fn().mockImplementationOnce(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        message: "Stoped the stuff",
      }),
  })
);

fireEvent.click(stopButton);
global.fetch = jest.fn().mockImplementationOnce(() =>
Promise.resolve({
  json: () =>
    Promise.resolve({
      message: "Deleted the stuff",
    }),
})
);
fireEvent.click(DeleteButton)

});
