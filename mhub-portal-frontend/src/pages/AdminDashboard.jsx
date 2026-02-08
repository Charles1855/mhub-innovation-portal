import { useEffect, useState } from "react";
import axios from "../axios";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/admin/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const approveProject = async (id) => {
    await axios.post(`/admin/projects/${id}/approve`);
    fetchProjects();
  };

  const rejectProject = async (id) => {
    await axios.post(`/admin/projects/${id}/reject`);
    fetchProjects();
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin – All Submitted Projects</h1>

      {projects.length === 0 ? (
        <p>No projects submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.user.name}</td>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.status}</td>
                <td>
                  <button onClick={() => approveProject(project.id)}>
                    Approve
                  </button>
                  <button onClick={() => rejectProject(project.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
