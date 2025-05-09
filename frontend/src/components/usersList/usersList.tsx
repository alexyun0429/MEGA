import React from "react";
import { User } from "lucide-react";
import "./UsersList.css";

type UserType = { id: number; username: string };

export const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/users", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        } else {
          const data = await res.json();
          setError(data.error || "Failed to fetch users");
        }
      } catch {
        setError("Network error");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-list-container">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <h2 className="users-list-title">Your team:</h2>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <User className="user-icon" size={20} />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
