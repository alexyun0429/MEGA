import React, { useState, useEffect, useRef } from "react";
import { Clock, RotateCcw, Settings } from "lucide-react";
import "./PokerTimer.css";

const DOGGY_MESSAGES = [
  "USER was too busy chasing their tail!",
  "USER got distracted by a squirrel!",
  "USER is barking up the wrong tree!",
  "USER is in the doghouse for not voting!",
  "USER needs to paws and make a decision!",
  "USER's vote got buried in the backyard!",
  "USER went for a walk instead of voting!",
  "Ruff luck! USER didn't vote in time!",
  "USER is playing dead instead of voting!",
];

export default function PokerTimer({
  onTimeUp,
  nonVotingUsers = [],
  isRevealed = false,
  onTimerBreakSeal = null,
  className = "",
}) {
  const [timeLeft, setTimeLeft] = useState(60); // Initialize with 60 seconds
  const [initialTime, setInitialTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [dogMessage, setDogMessage] = useState("");
  const [showExplosion, setShowExplosion] = useState(false);

  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeSettings = () => {
    setShowSettings(true);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const saveTimeSettings = () => {
    const newTime = parseInt(inputRef.current.value, 10);
    if (!isNaN(newTime) && newTime > 0) {
      setInitialTime(newTime);
      setTimeLeft(newTime);
    }
    setShowSettings(false);
  };

  // Cancel settings
  const cancelSettings = () => {
    setShowSettings(false);
  };

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(initialTime);
      setIsExpired(false);
      setDogMessage("");
    }

    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setIsExpired(false);
    setDogMessage("");
    setShowExplosion(false);
  };

  const generateDogMessage = () => {
    if (nonVotingUsers.length === 0) return "";

    const randomUser =
      nonVotingUsers[Math.floor(Math.random() * nonVotingUsers.length)];
    const randomMessage =
      DOGGY_MESSAGES[Math.floor(Math.random() * DOGGY_MESSAGES.length)];

    return randomMessage.replace("USER", randomUser);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setIsExpired(true);

            setShowExplosion(true);

            const message = generateDogMessage();
            setDogMessage(message);

            if (onTimeUp) onTimeUp();

            if (onTimerBreakSeal && !isRevealed) {
              setTimeout(() => {
                onTimerBreakSeal();
              }, 1500);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, onTimeUp, onTimerBreakSeal, isRevealed, nonVotingUsers]);

  const getTimerColor = () => {
    if (isExpired) return "expired";
    if (timeLeft <= initialTime * 0.25) return "danger";
    if (timeLeft <= initialTime * 0.5) return "warning";
    return "normal";
  };

  return (
    <div className={`poker-timer ${getTimerColor()} ${className}`}>
      {showExplosion && (
        <div className="explosion">
          <div className="explosion-center"></div>
          <div className="explosion-particles"></div>
        </div>
      )}

      {showSettings ? (
        <div className="timer-settings">
          <label>
            Set timer (seconds):
            <input
              type="number"
              ref={inputRef}
              defaultValue={initialTime}
              min="5"
              max="600"
            />
          </label>
          <div className="settings-buttons">
            <button onClick={cancelSettings} className="cancel-btn">
              Cancel
            </button>
            <button onClick={saveTimeSettings} className="save-btn">
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="timer-display" onClick={handleTimeSettings}>
            <Clock size={18} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="timer-controls">
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="control-btn start-btn"
                disabled={isRevealed}
              >
                START
              </button>
            ) : (
              <button onClick={pauseTimer} className="control-btn stop-btn">
                STOP
              </button>
            )}

            <button onClick={resetTimer} className="control-btn reset-btn">
              <RotateCcw size={16} />
            </button>

            <button
              onClick={handleTimeSettings}
              className="control-btn settings-btn"
            >
              <Settings size={16} />
            </button>
          </div>
        </>
      )}

      {isExpired && dogMessage && (
        <div className="dog-message">
          <div className="dog-emoji">🐕</div>
          <p>{dogMessage}</p>
        </div>
      )}
    </div>
  );
}
