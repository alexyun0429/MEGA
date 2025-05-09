import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies for session
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        // Logged in successfully!
        navigate("/mega"); // adjust to your desired post-login route
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to MEGA (Make Estimations Great Again)</h1>
      <p>Please login</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="error" style={{ color: "red", marginTop: 8 }}>
            {error}
          </p>
        )}

        <button type="submit" style={{ marginTop: 16 }}>
          Login
        </button>
      </form>
    </div>
  );
};
