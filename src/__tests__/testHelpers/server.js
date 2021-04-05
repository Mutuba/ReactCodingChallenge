import { rest } from "msw";
import { setupServer } from "msw/node";
import { taskList, task } from "./constants";

const task_id = 13;
export const server = setupServer(
  rest.post("/api/v1/tasks/", (req, res, ctx) => {
    return res(ctx.json(task));
  }),
  rest.get("/api/v1/tasks/", (req, res, ctx) => {
    return res(ctx.json(taskList));
  }),

  rest.put(`/api/v1/tasks/${task_id}/finish/`, (req, res, ctx) => {
    return res(ctx.json(task));
  })
);
