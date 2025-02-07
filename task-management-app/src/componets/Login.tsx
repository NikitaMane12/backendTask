import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });
      const result = res.data;
      console.log("----result --", result);
      if (!result.isError) {
        Swal.fire({
          title: "Success!",
          text: result.meassge,
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.setItem("authtoken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/Taskform");
      } else {
        Swal.fire({
          title: "Error!",
          text: result.meassge,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.log("", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Login failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handlelogin}>
        <label className="login-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="login-links">
        <Link to="/register">Create an Account</Link>
      </div>
    </div>
  );
};

export default Login;
