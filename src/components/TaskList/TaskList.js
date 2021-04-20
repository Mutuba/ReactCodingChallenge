import React, { useEffect, useState } from "react";
import "../styles/TaskList.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../actions/task";
import TaskItem from "./TaskItem";
import TaskAppBar from "./TaskAppBar";

import TaskForm from "./TaskForm";

const TaskList = ({ getTasks, task: { tasks, loading } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks, loading]);

  const [formState, setFormState] = useState(false);

  const openFormOnClick = () => {
    setFormState(true);
  };

  return (
    <div className="task-container">
      <TaskAppBar onClickFormHanlder={openFormOnClick} formState={formState} />

      <div className="task-container-content">
        {formState ? (
          <TaskForm setFormState={setFormState} />
        ) : (
          <div>
            {loading ? (
              <div>
                <h1>Loading</h1>
              </div>
            ) : (
              <div className="Task">
                <div id='tasks' className="TaskList">
                  {tasks.map((task, index) => (
                    <TaskItem key={index} id={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


TaskList.propTypes = {
  getTasks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTasks })(TaskList);
