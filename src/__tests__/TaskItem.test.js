import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { task } from "./testHelpers/constants";
import TaskItem from "../components/TaskList/TaskItem";
import reducer from "../reducers";
import { server } from "./testHelpers/server";



afterEach(cleanup);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const initialState = {
  task: task,
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

it("renders the form correctly with all fields", () => {
  const { getByRole } = render(<TaskItem id={task.id} task={task} />, {
    wrapper: Wrapper,
  });

  const avatarImage = getByRole("avatarImage");
  const checkBox = getByRole("checkbox");

  expect(avatarImage).toBeInTheDocument();
  expect(checkBox).toBeInTheDocument();
});

it("update task to make a call to the API", async () => {
  server.use(
    rest.put("http://127.0.0.1:3000/api/v1/tasks/", (req, res, ctx) => {
      return res(ctx.json(task));
    })
  );

  const { getByRole } = render(<TaskItem id={task.id} task={task} />, {
    wrapper: Wrapper,
  });
  const checkBox = getByRole("checkbox");

  fireEvent.click(checkBox);


  expect(checkBox).toBeChecked();

});
