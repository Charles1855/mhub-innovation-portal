import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="center-page">
      <div className="card" onSubmit={submit}>
        <h2>Create Account </h2>
        <p>Join mHub and submit your innovation projects.</p>

        <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}
