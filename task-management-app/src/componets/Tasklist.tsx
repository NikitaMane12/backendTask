import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./taskList.css";

const API_URL = "https://backendtask-2.onrender.com/task/";

interface ITask {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
}

const TaskList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<ITask[]>(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editingTask) return;
    setEditingTask({ ...editingTask, [e.target.name]: e.target.value });
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const openUpdateForm = (task: ITask) => {
    setEditingTask(task);
  };

  const closeUpdateForm = () => {
    setEditingTask(null);
  };

  const updateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTask) return;

    try {
      await axios.put(`${API_URL}${editingTask._id}`, editingTask);
      setTasks(
        tasks.map((task) => (task._id === editingTask._id ? editingTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Task List</h2>

      <div className="task-grid">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="task-card"
            style={{
              borderColor:
                task.priority === "high"
                  ? "#EF4444"
                  : task.priority === "medium"
                  ? "#F59E0B"
                  : "#10B981",
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`task-status ${task.status}`}>{task.status}</span>
            <p className="task-priority">{task.priority} priority</p>
            <button className="update-btn" onClick={() => openUpdateForm(task)}>
              Update
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {editingTask && (
        <div className="update-form-container">
          <h3>Update Task</h3>
          <form onSubmit={updateTask}>
            <input
              type="text"
              name="title"
              value={editingTask.title}
              onChange={handleEditChange}
              required
            />
            <textarea
              name="description"
              value={editingTask.description}
              onChange={handleEditChange}
              required
            />
            <select
              name="priority"
              value={editingTask.priority}
              onChange={handleEditChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              name="status"
              value={editingTask.status}
              onChange={handleEditChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeUpdateForm}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskList;
