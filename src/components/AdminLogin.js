import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/Admin");
      const data = await response.json();
      //cdconsole.log("Fetched Data:", data);

      // Assuming data is an array of objects containing username and password fields
      const validUser = data.find(
        (user) => user.username === username && user.password === password
      );

      if (validUser) {
        navigate("/AdminDashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error occurred while logging in");
    }
  };

  return (
    <div className="AdminLogin">
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
