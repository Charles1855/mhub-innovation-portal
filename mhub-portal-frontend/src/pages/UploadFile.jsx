import { useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

export default function UploadFile() {
  const { projectId } = useParams();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(`/projects/${projectId}/files`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "File upload failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "green", textAlign: "center" }}>Upload File</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" style={{ backgroundColor: "olive", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Upload</button>
      </form>
    </div>
  );
}
