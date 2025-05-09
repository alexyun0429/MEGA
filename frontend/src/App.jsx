import React, { useState } from "react";
import VotingPie from "./components/VotingPie/VotingPie";
import "./App.css";

const POINT_OPTIONS = ["1", "2", "3", "5", "8", "13", "21", "?"];

export default function App() {
  const [votes, setVotes] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [username] = useState("User" + Math.floor(Math.random() * 1000));
  ``;
  const [userVoted, setUserVoted] = useState(false);

  const handleVote = (point) => {
    setVotes([...votes, point]);
    setUserVoted(true);
  };

  const handleReveal = () => setReveal(true);

  const handleReset = () => {
    setVotes([]);
    setReveal(false);
    setUserVoted(false);
  };

  return (
    <div className="app-container">
      <div className="poker-box">
        <div className="poker-content">
          <header>
            <h1>Planning Poker</h1>
            <div className="user-info">
              Playing as: <strong>{username}</strong>
            </div>
          </header>

          {!reveal && (
            <div className="voting-section">
              <h2>Select your point estimate</h2>
              <div className="point-buttons">
                {POINT_OPTIONS.map((point) => (
                  <button
                    key={point}
                    onClick={() => handleVote(point)}
                    disabled={userVoted}
                    className={userVoted ? "disabled" : ""}
                  >
                    {point}
                  </button>
                ))}
              </div>
              <div className="voting-status">
                {votes.length > 0 ? (
                  <p>
                    {votes.length} vote{votes.length !== 1 ? "s" : ""} submitted
                  </p>
                ) : (
                  <p>No votes yet</p>
                )}
              </div>
              <div className="action-buttons">
                <button
                  className="reveal-button"
                  onClick={handleReveal}
                  disabled={votes.length === 0}
                >
                  Reveal Votes
                </button>
              </div>
            </div>
          )}

          {/* Voting Pie Chart */}
          <VotingPie votes={votes} reveal={reveal} />

          {reveal && (
            <div className="reset-section">
              <button className="reset-button" onClick={handleReset}>
                Start New Round
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
