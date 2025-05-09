import React from "react";

export const WhoAmI = () => {
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

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Logged in as: {username}</p>
      )}
    </div>
  );
};
