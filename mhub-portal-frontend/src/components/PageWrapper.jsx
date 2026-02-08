import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PageWrapper({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f0f0f0" }}>
      <div style={{ flex: "1" }}>{children}</div>

      <footer style={{ padding: "20px", background: "#1b5e20", color: "white", textAlign: "center" }}>
        &copy; 2026 mHub Portal
      </footer>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
