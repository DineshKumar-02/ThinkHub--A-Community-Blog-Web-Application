import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

const BLOG_QUOTES = [
  { text: "Blogging is not just about writing, it is about sharing your voice and connecting with the community.", author: "ThinkHub" },
  { text: "The first thing you have to know about blogging is that it is a conversation.", author: "Valeria Maltoni" },
  { text: "Share your knowledge. It is a way to achieve immortality.", author: "Dalai Lama" },
  { text: "If you have knowledge, let others light their candles in it.", author: "Margaret Fuller" },
  { text: "Words are, of course, the most powerful drug used by mankind.", author: "Rudyard Kipling" }
];

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [currentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * BLOG_QUOTES.length);
    return BLOG_QUOTES[randomIndex];
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      if (!email) {
        alert("Please enter your email!");
        return;
      }
    } else {
      if (!name || !username || !email || !age) { 
        alert("Please fill all fields!"); 
        return; 
      }
      if (age < 13) { 
        alert("You must be at least 13!"); 
        return; 
      }
      if (username.length > 15) { 
        alert("Username must be within 15 characters!"); 
        return; 
      }
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/users/login" : "/api/users/signup";
      const payload = isLogin ? { email } : { name, username, email, age };
      
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("name", data.user.name || "");
        localStorage.setItem("email", data.user.email || "");
        localStorage.setItem("age", data.user.age || "");
        navigate("/home");
      } else {
        alert(data.error || data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const currentUrl = window.location.origin + "/";

  return (
    <div className="auth-split-container animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>{isLogin ? "ThinkHub – Login" : "ThinkHub – Sign Up"}</title>
      <meta name="description" content="Access ThinkHub, a warm, community-driven space to share lifestyle, tech, health, finance stories." />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content={isLogin ? "ThinkHub – Login" : "ThinkHub – Sign Up"} />
      <meta property="og:description" content="Access ThinkHub, a warm, community-driven space to share lifestyle, tech, health, finance stories." />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content={isLogin ? "ThinkHub – Login" : "ThinkHub – Sign Up"} />
      <meta property="twitter:description" content="Access ThinkHub, a warm, community-driven space to share lifestyle, tech, health, finance stories." />
      <meta property="twitter:url" content={currentUrl} />

      <div className="auth-left-panel">
        <div className="quote-box animate-scale">
          <span className="quote-icon">“</span>
          <p className="quote-text">{currentQuote.text}</p>
          <p className="quote-author">— {currentQuote.author}</p>
        </div>
      </div>
      <div className="auth-right-panel">
        <form className="glass-card auth-box animate-scale" onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <img 
              src="/cartoon-writer.jpg" 
              alt="Cartoon Fox Writer" 
              style={{ 
                width: "90px", 
                height: "90px", 
                borderRadius: "50%", 
                boxShadow: "0 8px 16px rgba(255, 111, 0, 0.15)",
                border: "2px solid rgba(255, 111, 0, 0.25)"
              }} 
            />
          </div>
          <div className="auth-header">
            <h2 className="auth-title">📝 ThinkHub</h2>
            <p className="auth-subtitle">{isLogin ? "Access your account using your email" : "Create an account to join the community"}</p>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">Full Name</label>
              <input
                id="fullname"
                className="form-input"
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="signup-username" className="form-label">Username</label>
              <input
                id="signup-username"
                className="form-input"
                placeholder="e.g. johndoe"
                value={username}
                onChange={e => setUsername(e.target.value)}
                maxLength={15}
                disabled={loading}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="signup-email" className="form-label">Email Address</label>
            <input
              id="signup-email"
              className="form-input"
              placeholder="e.g. john@example.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="signup-age" className="form-label">Age</label>
              <input
                id="signup-age"
                className="form-input"
                placeholder="Minimum age 13"
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging In..." : "Signing Up...") : (isLogin ? "Login" : "Sign Up")}
          </button>

          <div style={{ marginTop: "20px", textAlign: "center", borderTop: "1px solid var(--border-glass)", paddingTop: "15px" }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ width: "100%", padding: "10px" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;