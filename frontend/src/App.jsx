import React from "react";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "60%",
          border: "4px solid #333",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table
          style={{
            width: "90%",
            borderCollapse: "collapse",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #333", padding: "12px" }}>
                Story
              </th>
              <th style={{ border: "1px solid #333", padding: "12px" }}>
                Votes
              </th>
              <th style={{ border: "1px solid #333", padding: "12px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #333", padding: "12px" }}>
                Story A
              </td>
              <td style={{ border: "1px solid #333", padding: "12px" }}>–</td>
              <td style={{ border: "1px solid #333", padding: "12px" }}>
                <button>Vote</button>
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #333", padding: "12px" }}>
                Story B
              </td>
              <td style={{ border: "1px solid #333", padding: "12px" }}>–</td>
              <td style={{ border: "1px solid #333", padding: "12px" }}>
                <button>Vote</button>
              </td>
            </tr>
            {/* Add more rows or map over your data here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
