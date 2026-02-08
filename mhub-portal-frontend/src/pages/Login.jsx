import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");

      navigate(res.data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error("Invalid login credentials");
    }
  };

  return (
    <div className="page">
      <form className="card" onSubmit={submit}>
        <h2>Welcome Back 👋</h2>
        <p>Log in to manage and submit innovation projects at mHub.</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Login</button>
      </form>
    </div>
  );
}
