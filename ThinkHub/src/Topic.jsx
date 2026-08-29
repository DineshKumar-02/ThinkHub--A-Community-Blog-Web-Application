import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import Navbar from "./Navbar";
import Footer from "./Footer";

const topicIcons = {
  Lifestyle: "🧘",
  Health: "❤️",
  Fitness: "💪",
  Tech: "💻",
  AI: "🤖",
  Cooking: "🍳",
  Entertainment: "🎬",
  "Movie Reviews": "🎥",
  Music: "🎵",
  "Podcast Reviews": "🎙️",
  Investments: "📈",
  Money: "💰",
  Finance: "🏦",
  Jokes: "😂"
};

function Topic() {
  const { name }                = useParams();
  const navigate                = useNavigate();
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]       = useState("");
  const [desc, setDesc]         = useState("");
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const emoji = topicIcons[name] || "📝";

  // Load posts from backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/posts/${name}`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [name]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!selected) return;
    function handleEscape(e) {
      if (e.key === "Escape") {
        setSelected(null);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selected]);

  async function submitPost(e) {
    e.preventDefault();
    if (!title || !desc) { 
      alert("Fill all fields!"); 
      return; 
    }

    const loggedInUsername = localStorage.getItem("username") || "Anonymous";

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, topic: name, username: loggedInUsername })
      });
      const data = await res.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        setTitle(""); 
        setDesc(""); 
        setShowForm(false);
      } else {
        alert(data.error || "Failed to add post");
      }
    } catch (err) {
      console.error("Add post error:", err);
      alert("Failed to submit post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  
  async function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const loggedInUsername = localStorage.getItem("username") || "Anonymous";
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}?username=${loggedInUsername}`, { 
        method: "DELETE" 
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  const currentUrl = `${window.location.origin}/topic/${name}`;
  
  // Breadcrumb Structured Data Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": name,
        "item": currentUrl
      }
    ]
  };

  // Article structured schema
  const blogSchema = selected ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": selected.title,
    "description": selected.desc ? selected.desc.slice(0, 150) + "..." : "",
    "author": {
      "@type": "Person",
      "name": selected.name || "Anonymous"
    },
    "datePublished": selected.created_at ? new Date(selected.created_at).toISOString() : new Date().toISOString()
  } : null;

  return (
    <div className="animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>{`${name} Hub – ThinkHub`}</title>
      <meta name="description" content={`Discover trending articles, guides, and thoughts on ${name} in the ThinkHub community.`} />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content={`${name} Hub – ThinkHub`} />
      <meta property="og:description" content={`Discover trending articles, guides, and thoughts on ${name} in the ThinkHub community.`} />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content={`${name} Hub – ThinkHub`} />
      <meta property="twitter:description" content={`Discover trending articles, guides, and thoughts on ${name} in the ThinkHub community.`} />
      <meta property="twitter:url" content={currentUrl} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {blogSchema && (
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      )}

      <Navbar />

      <header className="hero-section">
        <span style={{ fontSize: "clamp(36px, 8vw, 50px)", display: "block", marginBottom: "8px" }}>{emoji}</span>
        <h1 className="hero-title">
          {name} Hub
        </h1>
        <p className="hero-sub">
          Read trending stories and share your insights about {name}!
        </p>
        {!showForm && (
          <button 
            className="btn-primary animate-fade" 
            onClick={() => {
              const user = localStorage.getItem("username");
              if (!user) {
                alert("Please create an account or sign up to publish posts!");
                navigate("/");
              } else {
                setShowForm(true);
              }
            }}
            style={{ padding: "12px 24px", fontSize: "15px", borderRadius: "12px" }}
          >
            ➕ Create a Post
          </button>
        )}
      </header>

      {showForm && (
        <div className="app-container" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <form className="glass-card form-box animate-scale" onSubmit={submitPost} style={{ border: "1px solid var(--border-glass)" }}>
            <h3 style={{ color: "var(--text-white)" }}>New Post in {name}</h3>
            
            <div className="form-group">
              <label htmlFor="post-title" className="form-label">Post Title</label>
              <input 
                id="post-title"
                className="form-input" 
                placeholder="Give your article a catchy title" 
                value={title}
                onChange={e => setTitle(e.target.value)} 
                disabled={submitting}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="post-desc" className="form-label">Content Description</label>
              <textarea 
                id="post-desc"
                className="form-input" 
                placeholder="What's on your mind? Share your story..." 
                rows="6" 
                value={desc}
                onChange={e => setDesc(e.target.value)} 
                disabled={submitting}
                required
                style={{ resize: "vertical" }}
              />
            </div>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
              <button type="submit" className="btn-primary" style={{ flex: "1 1 160px", padding: "12px" }} disabled={submitting}>
                {submitting ? "Publishing..." : "Publish Post 🚀"}
              </button>
              <button type="button" className="btn-secondary" style={{ flex: "1 1 100px", padding: "12px 20px" }} onClick={() => setShowForm(false)} disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <main className="app-container">
        <h2 className="section-title">Community Posts</h2>
        {loading ? (
          <p style={{ color: "var(--color-primary)", fontWeight: "600", fontSize: "16px", marginTop: "20px" }}>
            Loading articles... ⏳
          </p>
        ) : (
          <>
            {posts.length === 0 && (
              <p style={{ color: "var(--text-muted)", marginTop: "20px", fontSize: "15px" }}>
                No articles published under this topic yet. Be the first to share! 🙌
              </p>
            )}
            <div className="posts-grid">
              {posts.map((p, i) => {
                const loggedInUsername = localStorage.getItem("username");
                const canDelete = loggedInUsername && p.username === loggedInUsername;
                return (
                  <article 
                    key={i} 
                    className="glass-card glass-card-hover post-card animate-slide" 
                    onClick={() => setSelected(p)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(p);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read story: ${p.title} by ${p.name || "Anonymous"}`}
                    style={{ cursor: "pointer", transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "11px", background: "rgba(255, 111, 0, 0.08)", border: "1px solid rgba(255, 111, 0, 0.15)", padding: "3px 8px", borderRadius: "10px", color: "var(--color-primary)", fontWeight: "700" }}>
                        👤 {p.name || "Anonymous"}{p.username ? ` (@${p.username})` : ""}
                      </span>
                    </div>

                    <h3 className="post-card-title">{p.title}</h3>
                    <p className="post-card-desc">
                      {p.desc && p.desc.length > 120 ? p.desc.slice(0, 120) + "..." : p.desc}
                    </p>
                    <div className="post-card-footer" style={{ borderTop: "1px solid rgba(255, 111, 0, 0.08)", paddingTop: "12px", marginTop: "12px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-dark)", fontWeight: "500" }}>
                        📅 {p.created_at ? new Date(p.created_at).toLocaleDateString() : "Just now"}
                      </span>
                      {canDelete && (
                        <button 
                          className="btn-secondary" 
                          onClick={e => { e.stopPropagation(); deletePost(p._id); }}
                          style={{ padding: "5px 10px", fontSize: "12px", color: "var(--text-white)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "6px" }}
                          onMouseOver={e => { e.target.style.background = "rgba(239, 68, 68, 0.2)"; }}
                          onMouseOut={e => { e.target.style.background = "rgba(239, 68, 68, 0.1)"; }}
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>

      {selected && (
        <div className="modal-overlay animate-fade" onClick={() => setSelected(null)}>
          <div className="glass-card modal-content animate-scale" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details modal">✕</button>
            <h2 className="modal-title">{selected.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", color: "var(--text-dark)", fontSize: "13px", alignItems: "center" }}>
              <span style={{ background: "rgba(255, 111, 0, 0.08)", color: "var(--color-primary)", padding: "3px 10px", borderRadius: "12px", fontWeight: "700" }}>
                👤 {selected.name || "Anonymous"}{selected.username ? ` (@${selected.username})` : ""}
              </span>
              <span>•</span>
              <span>Category: <strong>{name}</strong></span>
              <span>•</span>
              <span>Published: {selected.created_at ? new Date(selected.created_at).toLocaleDateString() : "Unknown"}</span>
            </div>
            <div className="modal-body">{selected.desc}</div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Topic;