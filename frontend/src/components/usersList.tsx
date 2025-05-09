import React from "react";

export const UsersList = () => {
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/users", {
          method: "GET",
          credentials: "include", // include cookies for session
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        } else {
          const data = await res.json();
          setError(data.error || "Failed to fetch users");
        }
      } catch (err) {
        setError("Network error");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
