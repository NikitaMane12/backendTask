import "./style.css";
const CreateTask = () => {
  const handleCreateTask = () => {};
  return (
    <div className="create-task-container">
      <h2 className="create-task-title">Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <label htmlFor="title" className="create-task-label">
          Task Title
        </label>
        <input id="title" type="text" className="create-task-input" />

        <label htmlFor="description" className="create-task-label">
          Task Description
        </label>
        <textarea id="description" className="create-task-textarea"></textarea>

        <button type="submit" className="create-task-button">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
