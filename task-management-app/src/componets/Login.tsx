import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define types for response
interface LoginResponse {
  isError: boolean;
  message: string;
  token?: string;
  user?: Record<string, unknown>;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:3001/users/login",
        {
          email,
          password,
        }
      );

      const result = res.data;
      console.log("----result --", result);

      if (!result.isError) {
        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        if (result.token) localStorage.setItem("authtoken", result.token);
        if (result.user)
          localStorage.setItem("user", JSON.stringify(result.user));

        navigate("/Taskform");
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        title: "Error!",
        text:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Login failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <label className="login-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          required
          value={password}
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
