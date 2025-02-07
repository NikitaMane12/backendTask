import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Task Management System</h1>
        <p>Organize your tasks efficiently and boost productivity.</p>
        <button onClick={() => navigate("/login")}>Get Started</button>
      </section>
    </div>
  );
};

export default Home;
