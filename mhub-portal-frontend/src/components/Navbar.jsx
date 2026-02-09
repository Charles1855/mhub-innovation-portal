import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getUser();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      width: "100%",
      height: "60px",
      backgroundColor: "#000000",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      zIndex: 1000
    }}>
      <strong style={{color: "#21ba19"}}>mHub Portal</strong>
      <div>
        {!loggedIn && (
          <>
            <Link to="/login" style={{ color: "#21ba19", marginRight: 15 }}>Login</Link>
            <Link to="/register" style={{ color: "#21ba19" }}>Register</Link>
          </>
        )}

        {loggedIn && user?.role !== "admin" && (
          <>
            <Link to="/dashboard" style={{ color: "white", marginRight: 15 }}>Dashboard</Link>
            <Link to="/create-project" style={{ color: "white", marginRight: 15 }}>Submit Project</Link>
            <Link to="/profile" style={{ color: "white", marginRight: 15 }}>Profile</Link>
            <button onClick={logout} style={{ background: "#558b2f", border: "none", color: "white", padding: "6px 12px", cursor: "pointer" }}>Logout</button>
          </>
        )}

        {loggedIn && user?.role === "admin" && (
          <>
            <Link to="/admin" style={{ color: "white", marginRight: 15 }}>Admin Dashboard</Link>
            <button onClick={logout} style={{ background: "#558b2f", border: "none", color: "white", padding: "6px 12px", cursor: "pointer" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
