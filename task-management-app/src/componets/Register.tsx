import { Link } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  interface ApiResponse {
    isError: boolean;
    message: string;
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<ApiResponse>(
        "http://localhost:3001/users/register",
        {
          name,
          email,
          password,
        }
      );

      const result = res.data;
      console.log(result);

      if (!result.isError) {
        Swal.fire({
          title: "Success!",
          text: result.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Registration failed",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Registration failed",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSignUp}>
        <label className="register-label">Name</label>
        <input
          type="text"
          className="register-input"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="register-label">Email</label>
        <input
          type="email"
          className="register-input"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="register-label">Password</label>
        <input
          type="password"
          className="register-input"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="register-links">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
