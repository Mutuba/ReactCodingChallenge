import { GET_TASKS, TASK_ERROR, ADD_TASK, UPDATE_TASK } from "../actions/types";

const initialState = {
  tasks: [],
  task: null,
  loading: true,
  error: {},
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS:
      const allTasks = [];
      payload.forEach((task) => {
        if (task.finished) {
          allTasks.unshift(task);
        } else {
          allTasks.push(task);
        }
      });

      return {
        ...state,
        tasks: allTasks,
        loading: false,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        loading: false,
      };

    case UPDATE_TASK:
      let tasks = state.tasks.filter((task) => task.id !== payload.id);
      tasks.unshift(payload);
      return {
        ...state,
        tasks,

        loading: false,
      };

    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default taskReducer;
