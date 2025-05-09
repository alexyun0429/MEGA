import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogIn } from "lucide-react";
import "./Login.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        navigate("/mega");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <h1>
          Welcome to <span style={{ color: "#2563eb" }}>MEGA</span>
        </h1>
        <p>Make Estimations Great Again</p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <User className="input-icon" size={20} />
            <input
              className="text-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="login-button">
            <LogIn className="login-icon" size={20} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
