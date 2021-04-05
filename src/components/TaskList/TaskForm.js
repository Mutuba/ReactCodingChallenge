import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTask } from "../../actions/task";

import "./TaskForm.css";

const TaskForm = ({ addTask, setFormState }) => {
  const [descripton, setDescription] = useState("");

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedAvatar) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedAvatar);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAvatar]);

  const onSelectAvatar = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedAvatar(undefined);
      return;
    }
    if (!validateFile(e.target.files[0])) {
      e.target.value = null;
      return;
    }
    setSelectedAvatar(e.target.files[0]);
    // setAvatar(e.target.files[0].name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    addTask(formData, setFormState);
    setDescription("");
    setSelectedAvatar("");
  };

  const validateFile = (fileObject) => {
    const allowedExtensions = ["jpg", "jpeg", "png"],
      sizeLimit = 1000000;

    const { name: fileName, size: fileSize } = fileObject;

    const fileExtension = fileName.split(".").pop();
    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      alert("Please upload only jpg, jpeg and png files");
      return false;
    } else if (fileSize > sizeLimit) {
      alert("File size too large");
      return false;
    }
    return true;
  };

  return (
    <div role="taskForm" className="task-form-body">
      <form onSubmit={handleSubmit} data-testid="form">
        <div className="form-task-description">
          <input
            type="text"
            name="description"
            role="description"
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
            value={descripton}
            required
          />
        </div>
        <div className="task-form-avatar">
          <label htmlFor="avatar">Avatar URL</label>
          <span>
            <input
              id="avatar"
              name="avatar"
              type="file"
              placeholder="Avatar URL"
              onChange={onSelectAvatar}
            />

            {selectedAvatar && (
              <img
                role="preview"
                src={preview}
                className="preview-image"
                value={preview}
              />
            )}
          </span>
        </div>

        <div className="submit-button">
          <button disabled={descripton === ""}>Add</button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(TaskForm);
