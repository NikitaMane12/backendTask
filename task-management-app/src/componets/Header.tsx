import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userToken");
    setLoggedIn(!!user);
  }, []);

  const handleAuthAction = () => {
    if (loggedIn) {
      localStorage.removeItem("userToken");
      setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        height: "80px",
        width: "100%",
        background: "navy",
        color: "white",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Task Management Application
      </h3>

      <h3 style={{ cursor: "pointer" }} onClick={handleAuthAction}>
        {loggedIn ? "Logout" : "Login"}
      </h3>
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/tasklist")}>
        DashBord
      </h3>
    </div>
  );
};

export default Header;
