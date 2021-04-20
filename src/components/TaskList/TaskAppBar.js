import React from "react";
import "../styles/TaskAppBar.css";

const TaskAppBar = ({ onClickFormHanlder, formState }) => {
  return (
    <div className="task-app-bar">
      <div className="task-bar-header">{formState ? "Add Task" : "Tasks"}</div>

      {!formState && (
        <div role='addTask' onClick={onClickFormHanlder} className="task-bar-add-icon">
          +
        </div>
      )}
    </div>
  );
};

export default TaskAppBar;
