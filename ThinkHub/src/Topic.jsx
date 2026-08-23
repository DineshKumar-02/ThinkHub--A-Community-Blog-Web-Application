import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

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

  // Load posts from backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/posts/${name}`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [name]);

  async function submitPost(e) {
    e.preventDefault();
    if (!title || !desc) { alert("Fill all fields!"); return; }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, topic: name })
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
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  return (
    <div className="animate-fade">
      <nav className="navbar">
        <span className="nav-logo" onClick={() => navigate("/home")}>📝 ThinkHub</span>
        <button className="btn-secondary" onClick={() => navigate("/home")}>← Back</button>
      </nav>

      <header className="hero-section">
        <h1 className="hero-title">{name}</h1>
        <p className="hero-sub">Explore articles and share your thoughts on {name}!</p>
        {!showForm && (
          <button className="btn-primary animate-fade" onClick={() => setShowForm(true)}>
            ➕ Create a Post
          </button>
        )}
      </header>

      {showForm && (
        <form className="glass-card form-box animate-scale" onSubmit={submitPost}>
          <h3>New Post in {name}</h3>
          <div className="form-group">
            <label className="form-label">Post Title</label>
            <input 
              className="form-input" 
              placeholder="Give your article a catchy title" 
              value={title}
              onChange={e => setTitle(e.target.value)} 
              disabled={submitting}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content Description</label>
            <textarea 
              className="form-input" 
              placeholder="What's on your mind? Share your story..." 
              rows="6" 
              value={desc}
              onChange={e => setDesc(e.target.value)} 
              disabled={submitting}
              required
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={submitting}>
              {submitting ? "Publishing..." : "Publish Post 🚀"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)} disabled={submitting}>
              Cancel
            </button>
          </div>
        </form>
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
              {posts.map((p, i) => (
                <article key={i} className="glass-card glass-card-hover post-card" onClick={() => setSelected(p)}>
                  <h3 className="post-card-title">{p.title}</h3>
                  <p className="post-card-desc">
                    {p.desc && p.desc.length > 120 ? p.desc.slice(0, 120) + "..." : p.desc}
                  </p>
                  <div className="post-card-footer">
                    <span style={{ fontSize: "12px", color: "var(--text-dark)" }}>
                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : "Just now"}
                    </span>
                    <button 
                      className="btn-danger" 
                      onClick={e => { e.stopPropagation(); deletePost(p._id); }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      {selected && (
        <div className="modal-overlay animate-fade" onClick={() => setSelected(null)}>
          <div className="glass-card modal-content animate-scale" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <h2 className="modal-title">{selected.title}</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", color: "var(--text-dark)", fontSize: "13px" }}>
              <span>Category: <strong>{name}</strong></span>
              <span>•</span>
              <span>Published: {selected.created_at ? new Date(selected.created_at).toLocaleDateString() : "Unknown"}</span>
            </div>
            <div className="modal-body">{selected.desc}</div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>© 2026 ThinkHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Topic;