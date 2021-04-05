import axios from "axios";
import { GET_TASKS, TASK_ERROR, ADD_TASK, UPDATE_TASK } from "./types";

// Get tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("https://ruby-backend-code-challenge.herokuapp.com/api/v1/tasks/");
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status,
      },
    });
  }
};

// Add task
export const addTask = (formData, callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://ruby-backend-code-challenge.herokuapp.com/api/v1/tasks/",
      formData
    );

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });

    callback(false);
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};

// Add task
export const updateTask = (task_id) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://ruby-backend-code-challenge.herokuapp.com/api/v1/tasks//${task_id}/finish/`
    );

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};
