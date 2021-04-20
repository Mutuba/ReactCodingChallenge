import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { rest } from "msw";
import App from "../App";
import { taskList } from "./testHelpers/constants";

import { server } from "./testHelpers/server";
afterEach(cleanup);

// setup server listener
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("render app with task list", async () => {
  server.use(
    rest.get("http://127.0.0.1:3000/api/v1/tasks/", (req, res, ctx) => {
      return res(ctx.json(taskList));
    })
  );
  render(<App />);
  setTimeout(() => {
    const taskDescription = "Wash baby Pearl before going out";

    expect(screen.getByTestId("tasks")).toBeTruthy();
    expect(screen.getAllByText(taskDescription)).toBeTruthy();
  }, 1000);
});
