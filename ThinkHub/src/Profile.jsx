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

      <main className="app-container" style={{ padding: "40px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          alignItems: "start",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Column 1: Account Information */}
          <div className="glass-card animate-scale" style={{ padding: "35px", textAlign: "center", border: "1px solid var(--border-glass)" }}>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <div style={{ 
                width: "90px", 
                height: "90px", 
                borderRadius: "50%", 
                background: "var(--gradient-primary)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "38px",
                boxShadow: "0 8px 24px rgba(255, 111, 0, 0.2)",
                border: "3px solid rgba(255, 111, 0, 0.3)"
              }}>
                👤
              </div>
            </div>

            <h1 className="hero-title" style={{ fontSize: "28px", marginBottom: "6px" }}>{name}</h1>
            <p style={{ color: "var(--color-primary)", fontWeight: "700", fontSize: "15px", marginBottom: "24px" }}>@{username}</p>

            <div style={{ 
              textAlign: "left", 
              background: "rgba(255, 255, 255, 0.4)", 
              borderRadius: "12px", 
              padding: "20px", 
              marginBottom: "24px",
              border: "1px solid var(--border-glass)"
            }}>
              <h2 style={{ fontSize: "16px", marginBottom: "14px", color: "var(--text-white)", borderBottom: "1px solid var(--border-glass)", paddingBottom: "8px" }}>
                Account Information
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Full Name:</strong> 
                  <span>{name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Username:</strong> 
                  <span>@{username}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Email Address:</strong> 
                  <span style={{ wordBreak: "break-all", marginLeft: "10px", textAlign: "right" }}>{email}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Age:</strong> 
                  <span>{age} years old</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                className="btn-primary" 
                style={{ flex: 1, padding: "12px" }}
                onClick={() => navigate("/home")}
              >
                Go to Feed 🏠
              </button>
              
              <button 
                className="btn-secondary" 
                style={{ 
                  padding: "12px 20px", 
                  color: "#dc2626", 
                  background: "rgba(239, 68, 68, 0.08)", 
                  border: "1px solid rgba(239, 68, 68, 0.15)",
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
          <div className="glass-card animate-scale" style={{ padding: "35px", border: "1px solid var(--border-glass)", minHeight: "450px" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", color: "var(--text-white)", borderBottom: "1px solid var(--border-glass)", paddingBottom: "10px", textAlign: "left" }}>
              My Stories 📝 ({userPosts.length})
            </h2>
            
            {loadingPosts ? (
              <p style={{ color: "var(--color-primary)", fontWeight: "600", textAlign: "center", marginTop: "40px" }}>
                Loading your stories... ⏳
              </p>
            ) : userPosts.length === 0 ? (
              <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "60px" }}>
                <p style={{ fontSize: "15px", marginBottom: "16px" }}>You haven't shared any stories yet!</p>
                <button className="btn-secondary" onClick={() => navigate("/home")} style={{ fontSize: "13px" }}>
                  Browse Topics & Write ✍️
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "500px", overflowY: "auto", paddingRight: "4px" }}>
                {userPosts.map((post) => (
                   <div 
                     key={post._id} 
                     style={{ 
                       background: "rgba(255, 255, 255, 0.4)", 
                       borderRadius: "10px", 
                       padding: "16px", 
                       border: "1px solid var(--border-glass)",
                       textAlign: "left",
                       display: "flex",
                       flexDirection: "column",
                       gap: "8px"
                     }}
                   >
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "12px" }}>
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
                     <h3 style={{ fontSize: "16px", color: "var(--text-white)", margin: "0", fontWeight: "700" }}>
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
                       lineHeight: "1.5"
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
