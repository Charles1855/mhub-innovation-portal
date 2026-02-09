// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProjects(res.data))
      .catch(() => {});
  }, []);

  return (
      <div className="container">
        <h1>Welcome to mHub Innovation Portal </h1>
        <p>
          This platform allows innovators to submit ideas, track progress,
          and collaborate with mHub administrators.
        </p>

        <h2 style={{ marginTop: 30 }}>Your Submitted Projects</h2>

        {projects.length === 0 && (
          <p>No projects submitted yet. Start by submitting one!</p>
        )}

        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "#a3ec70",
              padding: 20,
              borderRadius: 6,
              marginBottom: 15,
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <small>Status: {project.status ?? "Pending review"}</small>
          </div>
        ))}
      </div>

  );
}
