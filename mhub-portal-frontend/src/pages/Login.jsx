import { useState } from "react";
import axios from "../utils/axios";
import { Navigate,useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth"; 
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
    <div className="center-page" style={{background: "#a3ec70", height: "94vh"}}>
      <div className="card">
        <h2> Welcome Back</h2>
        <p>Log in to manage and submit innovation projects at mHub.</p>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}/>
        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}
