import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTask } from "../../actions/task";

import "./TaskItem.css";

const TaskItem = ({
  updateTask,
  task: { id, description, avatar, finished, finished_at },
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheckBoxChange = (event) => {
    setChecked(true)
    updateTask(id);
  };

  const timeformat = (date) => {
    let h = date.getHours();
    let m = date.getMinutes();
    let x = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? "0" + m : m;
    let mytime = h + ":" + m + " " + x;
    return mytime;
  };

  return (
    <div>
      {finished ? (
        <div role="main" className="list-wrapper">
          <div className="inner-flex">
            <div className="task-item">
              <span className="image-span">
                <img
                  className="avatar-image"
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "70%" }}
                  width="50px"
                  height="50px"
                  name="avatar"
                />
              </span>

              <div className="task-description">{description}</div>
            </div>
          </div>

          <div className="task-finish-time">
            {timeformat(new Date(finished_at))}
          </div>
        </div>
      ) : (
        <div className="list-wrapper">
          <div className="inner-flex">
            <div className="task-item">
              <span className="image-span">
                <img
                  role="avatarImage"
                  className="avatar-image"
                  src={avatar}
                  alt="avatar"
                  style={{ borderRadius: "70%" }}
                  width="50px"
                  height="50px"
                  name="avatar"
                />
              </span>

              <div className="task-description">{description}</div>
            </div>
          </div>

          <div className="task-checkbox-input">
            <input
              role="checkbox"
              className="taskCheckbox"
              name="finished"
              type="checkbox"
              value={checked}
              checked={checked}
              onChange={handleCheckBoxChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object,
  updateTask: PropTypes.func.isRequired,
};

export default connect(null, { updateTask })(TaskItem);
