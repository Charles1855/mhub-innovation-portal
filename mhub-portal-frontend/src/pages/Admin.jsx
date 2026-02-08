import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/admin/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const approveProject = async (id) => {
    try {
      await axios.post(`/admin/projects/${id}/approve`);
      toast.success("Project approved");
      fetchProjects();
    } catch {
      toast.error("Failed to approve project");
    }
  };

  const rejectProject = async (id) => {
    try {
      await axios.post(`/admin/projects/${id}/reject`);
      toast.success("Project rejected");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading projects...</p>;

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh", padding: "80px 50px", background: "#f0f0f0" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Dashboard – All Submitted Projects</h1>

        {projects.length === 0 ? (
          <p style={{ textAlign: "center" }}>No projects submitted yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
            <thead>
              <tr>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td style={tdStyle}>{project.user?.name}</td>
                  <td style={tdStyle}>{project.title}</td>
                  <td style={tdStyle}>{project.description}</td>
                  <td style={tdStyle}>{project.phone}</td>
                  <td style={tdStyle}>{project.status}</td>
                  <td style={tdStyle}>
                    <button onClick={() => approveProject(project.id)} style={buttonStyleApprove}>Approve</button>
                    <button onClick={() => rejectProject(project.id)} style={buttonStyleReject}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </>
  );
}

const thStyle = { border: "1px solid #ccc", padding: "10px", background: "#1976d2", color: "white" };
const tdStyle = { border: "1px solid #ccc", padding: "10px", textAlign: "center" };
const buttonStyleApprove = { marginRight: "10px", background: "#4caf50", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" };
const buttonStyleReject = { background: "#f44336", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" };
