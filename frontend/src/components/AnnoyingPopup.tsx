import React, { useState, useEffect } from "react";

export default function SimplePopup() {
  const [visible, setVisible] = useState(false);

  // Show popup after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#3b82f6",
        borderRadius: "8px",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
        padding: "24px",
        width: "320px",
        zIndex: 50,
        animation: "slideUp 0.5s ease-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            color: "white",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
          }}
          onMouseOver={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.style.color = "#bfdbfe";
            }
          }}
          onMouseOut={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.style.color = "white";
            }
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "8px",
          }}
        >
          AMAZING NEWS!
        </h2>

        <div
          style={{
            backgroundColor: "#fde047",
            padding: "8px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <p
            style={{
              color: "#1e40af",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            This App Is And Always Will Be
          </p>
          <p
            style={{
              color: "#dc2626",
              fontWeight: "bold",
              fontSize: "32px",
              animation: "pulse 2s infinite",
            }}
          >
            100% FREE!
          </p>
        </div>

        <p
          style={{
            color: "white",
            marginBottom: "16px",
          }}
        >
          No credit card, no subscription, no hidden fees EVER!
        </p>

        <button
          style={{
            backgroundColor: "#22c55e",
            color: "white",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "9999px",
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleClose}
          onMouseOver={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.style.backgroundColor = "#16a34a";
            }
          }}
          onMouseOut={(e) => {
            if (e.target instanceof HTMLElement) {
              e.target.style.backgroundColor = "#22c55e";
            }
          }}
        >
          AWESOME!
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
