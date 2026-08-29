import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="app-footer glass-card" style={{ borderRadius: "16px 16px 0 0", borderBottom: "none" }}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", 
        gap: "24px", 
        textAlign: "left", 
        maxWidth: "950px", 
        margin: "0 auto" 
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <img src={logo} alt="ThinkHub Logo" style={{ width: "32px", height: "32px", borderRadius: "8px", objectFit: "cover" }} />
            <h3 style={{ fontSize: "19px", margin: "0", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
              ThinkHub
            </h3>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "13.5px", lineHeight: "1.6" }}>
            A warm, creative community blogging space. Share your stories, lessons, daily insights, and connect with thinkers and creators worldwide.
          </p>
        </div>
        
        <div style={{ minWidth: 0 }}>
          <h4 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--text-white)" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px" }}>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/home")}>🏠 Home Feed</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/about")}>👋 About Us</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/contact")}>📬 Contact & Feedback</span></li>
            {localStorage.getItem("username") && (
              <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/profile")}>👤 My Profile</span></li>
            )}
          </ul>
        </div>

        <div style={{ minWidth: 0 }}>
          <h4 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--text-white)" }}>Popular Topics</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px" }}>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/topic/Tech")}>💻 Tech & AI</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/topic/Lifestyle")}>🧘 Lifestyle</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/topic/Finance")}>📈 Money & Finance</span></li>
            <li><span style={{ cursor: "pointer", color: "var(--text-muted)", display: "inline-block", padding: "2px 0" }} onClick={() => navigate("/topic/Jokes")}>😂 Entertainment & Jokes</span></li>
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-glass)", marginTop: "24px", paddingTop: "18px", color: "var(--text-dark)", fontSize: "12.5px", textAlign: "center" }}>
        © 2026 ThinkHub. All rights reserved. Crafted for creators.
      </div>
    </footer>
  );
}

export default Footer;
