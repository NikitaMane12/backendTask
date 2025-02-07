import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./taskform.css";

interface Task {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://backendtask-2.onrender.com/task/", task);
      onTaskAdded();
      setTask({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
      });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Task added successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding task:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add task!",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Add New Task</h2>

      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="form-input"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="form-textarea"
      ></textarea>
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="form-select"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="form-select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="form-button">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
