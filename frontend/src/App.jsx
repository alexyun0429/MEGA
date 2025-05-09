import React, { useState } from "react";
import VotingPie from "./components/VotingPie/VotingPie";
import PokerTimer from "./components/PokerTimer/PokerTimer";
import {UsersList} from "./components/usersList/usersList";
import "./App.css";
import KatelynsComponentDONTDELETE from "./components/katelynsPageDONTDELETE";
import AnnoyingPopup from "./components/AnnoyingPopup";

// Demo users for the timer
const DEMO_USERS = ["Alex", "Taylor", "Jordan", "Casey", "Morgan"];

export default function App() {
  const [votes, setVotes] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  const [isDogs, setIsDogs] = useState(false);

  // New state for tracking who has voted
  const [votedUsers, setVotedUsers] = useState([]);

  // Calculate non-voting users for the timer
  const nonVotingUsers = DEMO_USERS.filter(
    (user) => !votedUsers.includes(user)
  );
  const [username, setUsername] = React.useState("");
    const [error, setError] = React.useState("");
  
    React.useEffect(() => {
      const fetchUsername = async () => {
        try {
          const res = await fetch("/whoami", {
            method: "GET",
            credentials: "include", // include cookies for session
          });
  
          if (res.ok) {
            const data = await res.json();
            setUsername(data.username);
          } else {
            const data = await res.json();
            setError(data.error || "Failed to fetch username");
          }
        } catch (err) {
          setError("Network error");
        }
      };
  
      fetchUsername();
    }, []);

  const handleVote = (point, isDogs = false) => {
    setIsDogs(isDogs);
    const pointStr = String(point);
    console.log(point);
    setVotes([...votes, pointStr]);
    setUserVoted(true);

    // Simulate a random user voting (for demo purposes)
    const randomUser =
      DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)];
    if (!votedUsers.includes(randomUser)) {
      setVotedUsers([...votedUsers, randomUser]);
    }
  };

  const handleReveal = () => setReveal(true);

  const handleReset = () => {
    setVotes([]);
    setReveal(false);
    setUserVoted(false);
    setVotedUsers([]); // Reset voted users
  };

  // Handle timer expiration
  const handleTimeUp = () => {
    console.log("Time's up! These users didn't vote:", nonVotingUsers);
  };

  // Automatically reveal votes when timer expires
  const handleTimerBreakSeal = () => {
    if (!reveal && votes.length > 0) {
      handleReveal();
    }
  };

  return (
    <div className="app-container">
      <div className="poker-box">
        <div className="poker-content">
          <header>
            <h1>MEGA</h1>
            <span>Make Estimation Great Again!</span>
            <div className="user-info">
              Playing as: <strong>{username}</strong>
            </div>
          </header>

          {!reveal && (
            <div className="voting-section">
              <h2 style={{color: "black"}}>Select your point estimate</h2>
              <div className="katelyn-component-wrapper">
                <KatelynsComponentDONTDELETE onValueSelect={handleVote} />
              </div>

              {votedUsers.length > 0 && (
                <div className="voted-users">
                  <p>Voted: {votedUsers.join(", ")}</p>
                </div>
              )}

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

          <div className="voting-pie-container">
            <VotingPie votes={votes} reveal={reveal} isDogs={isDogs} />
          </div>

          <div className="timer-container">
            <PokerTimer
              onTimeUp={handleTimeUp}
              nonVotingUsers={nonVotingUsers}
              isRevealed={reveal}
              onTimerBreakSeal={handleTimerBreakSeal}
            />
          </div>

          {reveal && (
            <div className="reset-section">
              <button className="reset-button" onClick={handleReset}>
                Start New Round
              </button>
            </div>
          )}
        </div>
      </div>
        <UsersList />
      <AnnoyingPopup />
    </div>
  );
}
