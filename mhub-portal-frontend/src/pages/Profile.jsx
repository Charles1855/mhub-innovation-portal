import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/user")
      .then(res => setUser(res.data))
      .catch(() => {});
  }, []);

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: 80 }}>Loading profile...</p>;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh"
    }}>
      <div style={{
        width: 420,
        padding: 30,
        borderRadius: 10,
        background: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginBottom: 10 }}>👤 My Profile</h2>
        <p style={{ color: "#555", marginBottom: 20 }}>
          Manage and view your account information
        </p>

        <div style={{ marginBottom: 10 }}>
          <strong>Name:</strong>
          <div>{user.name}</div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Email:</strong>
          <div>{user.email}</div>
        </div>

        <div>
          <strong>Role:</strong>
          <div style={{
            color: user.role === "admin" ? "#1b5e20" : "#333",
            fontWeight: "bold"
          }}>
            {user.role}
          </div>
        </div>
      </div>
    </div>
  );
}
