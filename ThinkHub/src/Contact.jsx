import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade">
      <nav className="navbar">
        <span className="nav-logo" onClick={() => navigate("/home")}>📝 ThinkHub</span>
        <button className="btn-secondary" onClick={() => navigate("/home")}>← Back</button>
      </nav>

      <main className="app-container" style={{ minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-card contact-card animate-scale" style={{ width: "100%", padding: "40px" }}>
          <h2>📬 Contact Us</h2>
          <p style={{ color: "var(--text-muted)", margin: "16px 0 24px 0" }}>
            Have feedback, suggestions, or want to collaborate? Reach out to us via email:
          </p>
          <a className="contact-email" href="mailto:dineshsudhkarakaran2706@gmail.com">
            dineshsudhkarakaran2706@gmail.com
          </a>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 ThinkHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;