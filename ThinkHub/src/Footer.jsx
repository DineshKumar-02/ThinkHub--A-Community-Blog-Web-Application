import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="app-footer glass-card" style={{ marginTop: "80px", padding: "40px 24px", borderRadius: "16px 16px 0 0", borderBottom: "none" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "30px", textAlign: "left", maxWidth: "950px", margin: "0 auto" }}>
        <div style={{ flex: "1.5", minWidth: "250px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <img src={logo} alt="ThinkHub Logo" style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover" }} />
            <h3 style={{ fontSize: "20px", margin: "0", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
              ThinkHub
            </h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: "1.6" }}>
            A warm, creative community blogging space. Share your stories, lessons, daily insights, and connect with thinkers and creators worldwide.
          </p>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-white)" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/home")}>🏠 Home Feed</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/about")}>👋 About Us</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/contact")}>📬 Contact & Feedback</span></li>
            {localStorage.getItem("username") && (
              <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/profile")}>👤 My Profile</span></li>
            )}
          </ul>
        </div>
        <div style={{ flex: "1", minWidth: "150px" }}>
          <h4 style={{ fontSize: "16px", marginBottom: "12px", color: "var(--text-white)" }}>Popular Topics</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/topic/Tech")}>💻 Tech & AI</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/topic/Lifestyle")}>🧘 Lifestyle</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/topic/Finance")}>📈 Money & Finance</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)" }} onClick={() => navigate("/topic/Jokes")}>😂 Entertainment & Jokes</span></li>
          </ul>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--border-glass)", marginTop: "30px", paddingTop: "20px", color: "var(--text-dark)", fontSize: "13px", textAlign: "center" }}>
        © 2026 ThinkHub. All rights reserved. Crafted for creators.
      </div>
    </footer>
  );
}

export default Footer;
