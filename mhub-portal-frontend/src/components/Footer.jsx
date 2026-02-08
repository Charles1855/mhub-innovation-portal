export default function Footer() {
  return (
    <footer style={{
      height: "50px",
      background: "#1b5e20",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      © {new Date().getFullYear()} mHub Innovation Hub
    </footer>
  );
}
