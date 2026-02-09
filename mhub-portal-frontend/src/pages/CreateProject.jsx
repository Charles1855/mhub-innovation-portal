import { useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";

export default function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);

  const submitProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("phone", phone);
    if(file) formData.append("file", file);

    try {
      await axios.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project submitted successfully");
      setTitle(""); setDescription(""); setPhone(""); setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <>
      <div className="center-page">
        <div className="card">
          <h2>Submit Your Innovation</h2>
          <p>Share your innovative ideas with mHub and contribute to the ecosystem.</p>

          <form onSubmit={submitProject}>
            <input placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input placeholder="Contact Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <input type="file" onChange={e => setFile(e.target.files[0])} />

            <button type="submit">Submit Project</button>
          </form>
        </div>
      </div>
    </>
  );
}
