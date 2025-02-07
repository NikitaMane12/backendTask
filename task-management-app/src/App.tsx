import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componets/Header";

import Home from "./componets/Home";
import Footer from "./componets/Footer";

import Login from "./componets/Login";

import Register from "./componets/Register";
import TaskForm from "./componets/TaskForm";
import { useState } from "react";
import TaskList from "./componets/Tasklist";

const App = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/taskForm"
          element={<TaskForm onTaskAdded={() => setRefresh(!refresh)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/tasklist" element={<TaskList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
