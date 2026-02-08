export default function WelcomeBlock({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h1 style={{ color: "#1b5e20" }}>{title}</h1>
      <p style={{ fontSize: "16px", color: "#2e7d32" }}>
        {subtitle}
      </p>
      <hr />
    </div>
  );
}
