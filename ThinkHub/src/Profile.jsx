import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Profile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name") || "Guest User";
  const email = localStorage.getItem("email") || "No email provided";
  const age = localStorage.getItem("age") || "N/A";

  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Redirect to entry page if not logged in
  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  // Load user specific posts from backend
  useEffect(() => {
    if (!username) return;
    setLoadingPosts(true);
    fetch(`${API_BASE_URL}/api/posts/by-user/${username}`)
      .then(res => res.json())
      .then(data => setUserPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading user posts:", err))
      .finally(() => setLoadingPosts(false));
  }, [username]);

  async function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}?username=${username}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setUserPosts(userPosts.filter(p => p._id !== id));
      } else {
        alert(data.error || "Failed to delete post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting post.");
    }
  }

  if (!username) {
    return null;
  }

  const currentUrl = window.location.origin + "/profile";

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": `${name}'s Profile – ThinkHub`,
    "description": `View account details and stories metrics for @${username} on ThinkHub.`,
    "url": currentUrl
  };

  return (
    <div className="animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>{`${name} (@${username}) – Profile`}</title>
      <meta name="description" content={`View account details and metrics for @${username} on ThinkHub.`} />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content={`${name} (@${username}) – Profile`} />
      <meta property="og:description" content={`View account details and metrics for @${username} on ThinkHub.`} />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content={`${name} (@${username}) – Profile`} />
      <meta property="twitter:description" content={`View account details and metrics for @${username} on ThinkHub.`} />
      <meta property="twitter:url" content={currentUrl} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(profileSchema)}
      </script>

      <Navbar />

      <main className="app-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          gap: "24px",
          alignItems: "start",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Column 1: Account Information */}
          <div className="glass-card animate-scale" style={{ padding: "clamp(20px, 4vw, 35px)", textAlign: "center", border: "1px solid var(--border-glass)" }}>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                borderRadius: "50%", 
                background: "var(--gradient-primary)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "34px",
                boxShadow: "0 8px 24px rgba(255, 111, 0, 0.2)",
                border: "3px solid rgba(255, 111, 0, 0.3)"
              }}>
                👤
              </div>
            </div>

            <h1 className="hero-title" style={{ fontSize: "clamp(20px, 3.5vw, 28px)", marginBottom: "4px" }}>{name}</h1>
            <p style={{ color: "var(--color-primary)", fontWeight: "700", fontSize: "14px", marginBottom: "20px" }}>@{username}</p>

            <div style={{ 
              textAlign: "left", 
              background: "rgba(255, 255, 255, 0.4)", 
              borderRadius: "12px", 
              padding: "16px", 
              marginBottom: "20px",
              border: "1px solid var(--border-glass)"
            }}>
              <h2 style={{ fontSize: "15px", marginBottom: "12px", color: "var(--text-white)", borderBottom: "1px solid var(--border-glass)", paddingBottom: "8px" }}>
                Account Information
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13.5px", color: "var(--text-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                  <strong>Full Name:</strong> 
                  <span>{name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                  <strong>Username:</strong> 
                  <span>@{username}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                  <strong>Email Address:</strong> 
                  <span style={{ wordBreak: "break-all" }}>{email}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" }}>
                  <strong>Age:</strong> 
                  <span>{age} years old</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button 
                className="btn-primary" 
                style={{ flex: "1 1 140px", padding: "12px" }}
                onClick={() => navigate("/home")}
              >
                Go to Feed 🏠
              </button>
              
              <button 
                className="btn-secondary" 
                style={{ 
                  flex: "1 1 100px",
                  padding: "12px 16px", 
                  color: "#dc2626", 
                  background: "rgba(239, 68, 68, 0.08)", 
                  border: "1px solid rgba(239, 68, 68, 0.18)",
                  borderRadius: "10px"
                }}
                onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) {
                    localStorage.clear();
                    navigate("/");
                  }
                }}
              >
                Logout 🚪
              </button>
            </div>

          </div>

          {/* Column 2: User's Published Stories */}
          <div className="glass-card animate-scale" style={{ padding: "clamp(20px, 4vw, 35px)", border: "1px solid var(--border-glass)", minHeight: "380px" }}>
            <h2 style={{ fontSize: "clamp(17px, 3vw, 20px)", marginBottom: "18px", color: "var(--text-white)", borderBottom: "1px solid var(--border-glass)", paddingBottom: "10px", textAlign: "left" }}>
              My Stories 📝 ({userPosts.length})
            </h2>
            
            {loadingPosts ? (
              <p style={{ color: "var(--color-primary)", fontWeight: "600", textAlign: "center", marginTop: "40px" }}>
                Loading your stories... ⏳
              </p>
            ) : userPosts.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "40px" }}>
                <p style={{ fontSize: "14px", marginBottom: "16px" }}>You haven't shared any stories yet!</p>
                <button className="btn-secondary" onClick={() => navigate("/home")} style={{ fontSize: "13px" }}>
                  Browse Topics & Write ✍️
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "500px", overflowY: "auto", paddingRight: "4px" }}>
                {userPosts.map((post) => (
                   <div 
                     key={post._id} 
                     style={{ 
                       background: "rgba(255, 255, 255, 0.4)", 
                       borderRadius: "10px", 
                       padding: "14px", 
                       border: "1px solid var(--border-glass)",
                       textAlign: "left",
                       display: "flex",
                       flexDirection: "column",
                       gap: "8px"
                     }}
                   >
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                       <span style={{ 
                         fontSize: "11px", 
                         background: "rgba(255, 111, 0, 0.1)", 
                         color: "var(--color-primary)", 
                         padding: "2px 8px", 
                         borderRadius: "10px",
                         fontWeight: "700",
                         textTransform: "uppercase"
                       }}>
                         {post.topic}
                       </span>
                       <button 
                         className="btn-danger" 
                         style={{ padding: "4px 8px", fontSize: "11px", borderRadius: "6px" }}
                         onClick={() => deletePost(post._id)}
                       >
                         🗑️ Delete
                       </button>
                     </div>
                     <h3 style={{ fontSize: "15px", color: "var(--text-white)", margin: "0", fontWeight: "700", overflowWrap: "break-word" }}>
                       {post.title}
                     </h3>
                     <p style={{ 
                       fontSize: "13px", 
                       color: "var(--text-muted)", 
                       margin: "0",
                       display: "-webkit-box",
                       WebkitLineClamp: "2",
                       WebkitBoxOrient: "vertical",
                       overflow: "hidden",
                       textOverflow: "ellipsis",
                       lineHeight: "1.5",
                       overflowWrap: "break-word"
                     }}>
                       {post.desc}
                     </p>
                     <span style={{ fontSize: "11px", color: "var(--text-dark)" }}>
                       Posted on {new Date(post.created_at).toLocaleDateString()}
                     </span>
                   </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
