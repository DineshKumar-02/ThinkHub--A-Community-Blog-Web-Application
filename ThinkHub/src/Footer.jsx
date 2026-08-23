import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="app-footer glass-card" style={{ marginTop: "80px", padding: "40px 24px", borderRadius: "16px 16px 0 0", borderBottom: "none" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px", textAlign: "left", maxWidth: "950px", margin: "0 auto" }}>
        <div style={{ flex: "1.5", minWidth: "250px" }}>
          <h3 style={{ fontSize: "20px", marginBottom: "12px", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
            📝 ThinkHub
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6" }}>
            A warm, creative community blogging space. Share your stories, lessons, daily insights, and connect with thinkers and creators worldwide.
          </p>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-white)" }}>Navigation</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/home")}>Home</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/about")}>About Us</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/contact")}>Contact</span></li>
          </ul>
        </div>
        <div style={{ flex: "1", minWidth: "180px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-white)" }}>Stay Connected</h4>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "12px" }}>
            Have feedback or ideas? Send us a message anytime!
          </p>
          <button className="btn-secondary" style={{ padding: "8px 16px", fontSize: "13px" }} onClick={() => navigate("/contact")}>
            📬 Reach Out
          </button>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border-glass)", marginTop: "30px", paddingTop: "20px", color: "var(--text-dark)", fontSize: "13px", textAlign: "center" }}>
        © 2026 ThinkHub. All rights reserved. Crafted for creators.
      </div>
    </footer>
  );
}

export default Footer;
