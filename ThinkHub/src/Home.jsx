import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch recent posts across all topics
  useEffect(() => {
    setPostsLoading(true);
    fetch(`${API_BASE_URL}/api/posts`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading recent posts:", err))
      .finally(() => setPostsLoading(false));
  }, []);

  // Filter posts based on search query (filters by title, content, or category tag)
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade">
      {/* Global Navbar with integrated search query */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} />

      <header className="hero-section">
        <h1 className="hero-title">Welcome to ThinkHub! ✍️</h1>
        <p className="hero-sub">A premium space to share your stories, insights, and thoughts with the world.</p>
      </header>

      <main className="app-container">
        {/* Global Recent Blogs Flexbox feed */}
        <section>
          <h2 className="section-title">Community Stories</h2>
          {postsLoading ? (
            <p style={{ color: "var(--color-primary)", fontWeight: "600", marginTop: "20px" }}>
              Loading stories... ⏳
            </p>
          ) : (
            <div className="flex-posts-container">
              {filteredPosts.length === 0 ? (
                <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
                  {searchQuery ? `No stories found matching "${searchQuery}"` : "No stories shared yet. Be the first to share! 🙌"}
                </p>
              ) : (
                filteredPosts.map((p, idx) => (
                  <article 
                    key={idx} 
                    className="glass-card glass-card-hover flex-post-card animate-slide"
                    onClick={() => setSelectedPost(p)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex-post-main">
                      <span className="flex-post-tag">{p.topic}</span>
                      <h3 className="flex-post-title">{p.title}</h3>
                      <p className="flex-post-snippet">
                        {p.desc && p.desc.length > 180 ? p.desc.slice(0, 180) + "..." : p.desc}
                      </p>
                    </div>
                    <div className="flex-post-actions" onClick={e => e.stopPropagation()}>
                      <span style={{ fontSize: "13px", color: "var(--text-dark)" }}>
                        {p.created_at ? new Date(p.created_at).toLocaleDateString() : "Just now"}
                      </span>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: "8px 16px", fontSize: "13px" }}
                        onClick={() => setSelectedPost(p)}
                      >
                        Read 📖
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* Global Post Details Overlay */}
      {selectedPost && (
        <div className="modal-overlay animate-fade" onClick={() => setSelectedPost(null)}>
          <div className="glass-card modal-content animate-scale" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPost(null)}>✕</button>
            <h2 className="modal-title">{selectedPost.title}</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", color: "var(--text-dark)", fontSize: "13px" }}>
              <span>Topic: <strong>{selectedPost.topic}</strong></span>
              <span>•</span>
              <span>Published: {selectedPost.created_at ? new Date(selectedPost.created_at).toLocaleDateString() : "Unknown"}</span>
            </div>
            <div className="modal-body">{selectedPost.desc}</div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>© 2026 ThinkHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home; 