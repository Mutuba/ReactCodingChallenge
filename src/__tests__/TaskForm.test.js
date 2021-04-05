import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { rest } from "msw";
import { task } from "./testHelpers/constants";
import { testImageHelper } from "./testHelpers/testHelpers";
import TaskForm from "../components/TaskList/TaskForm";
import reducer from "../reducers";

import { server } from "./testHelpers/server";

afterEach(cleanup);

// setup server listener
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const initialState = {
  task: null,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

it("renders the form correctly with all fields", () => {
  const { getByPlaceholderText } = render(<TaskForm />, {
    wrapper: Wrapper,
  });

  const descriptionLabel = getByPlaceholderText(/Task Description/i);
  const avatarLabel = getByPlaceholderText(/Avatar URL/i);

  expect(descriptionLabel).toBeInTheDocument();
  expect(avatarLabel).toBeInTheDocument();
});

it("submit button should be disabled when Description field is empty", () => {
  const { getByPlaceholderText, getByRole } = render(<TaskForm />, {
    wrapper: Wrapper,
  });

  const descriptionInput = getByPlaceholderText(/Task Description/i);

  fireEvent.change(descriptionInput, { target: { value: "" } });

  const submitBtn = getByRole("button", { name: "Add" });

  expect(submitBtn).toHaveAttribute("disabled");
});

it("add task to make a call to the API", async () => {
  server.use(
    rest.post("http://127.0.0.1:3000/api/v1/tasks/", (req, res, ctx) => {
      return res(ctx.json(task));
    })
  );

  const { getByRole, getByPlaceholderText, getByTestId } = render(
    <TaskForm />,
    {
      wrapper: Wrapper,
    }
  );

  const inputDescription = getByPlaceholderText("Task Description");
  fireEvent.change(inputDescription, {
    target: { value: "Daniel setting up" },
  });

  expect(inputDescription.value).toBe("Daniel setting up");

  const avatarInput = getByPlaceholderText("Avatar URL");

  const file = testImageHelper();

  fireEvent.change(avatarInput, { target: { files: [file] } });

  const submitBtn = getByRole("button", { name: "Add" });

  // the submit button is is enabled as description field has been field
  expect(submitBtn).toBeEnabled();

  // submit the data
  fireEvent.click(screen.getByRole("button"));

  // after submission the submit button is back to disabled state
  expect(submitBtn).toBeDisabled();
});
