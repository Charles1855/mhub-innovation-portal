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
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Review and manage submitted innovation projects.</p>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>  
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.phone}</td>
              <td>{project.status}</td>
              <td>
                <button onClick={() => approveProject(project.id)} style={buttonStyleApprove}>Approve</button>
                <button onClick={() => rejectProject(project.id)} style={buttonStyleReject}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

const thStyle = { border: "1px solid #ccc", padding: "10px", background: "#1976d2", color: "white" };
const tdStyle = { border: "1px solid #ccc", padding: "10px", textAlign: "center" };
const buttonStyleApprove = { marginRight: "10px", background: "#4caf50", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" };
const buttonStyleReject = { background: "#f44336", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" };
