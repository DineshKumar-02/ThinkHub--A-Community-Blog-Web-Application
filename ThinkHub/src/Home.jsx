import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
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

  // Close modal on Escape key press
  useEffect(() => {
    if (!selectedPost) return;
    function handleEscape(e) {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedPost]);

  // Filter posts based on topic chip and search query
  const filteredPosts = posts.filter(p => {
    const matchesTopic = selectedTopic === "All" || p.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  async function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const loggedInUsername = localStorage.getItem("username");
    if (!loggedInUsername) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}?username=${loggedInUsername}`, { 
        method: "DELETE" 
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
        if (selectedPost && selectedPost._id === id) {
          setSelectedPost(null);
        }
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  const currentUrl = window.location.origin + "/home";
  
  // JSON-LD dynamic Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ThinkHub",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/home?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // JSON-LD dynamic BlogPosting Schema when modal is open
  const blogSchema = selectedPost ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": selectedPost.title,
    "description": selectedPost.desc ? selectedPost.desc.slice(0, 150) + "..." : "",
    "author": {
      "@type": "Person",
      "name": selectedPost.name || "Anonymous"
    },
    "datePublished": selectedPost.created_at ? new Date(selectedPost.created_at).toISOString() : new Date().toISOString()
  } : null;

  return (
    <div className="animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>ThinkHub – Community Stories & Insights</title>
      <meta name="description" content="Explore and search community stories, tech write-ups, lifestyle blogs, and more on ThinkHub." />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content="ThinkHub – Community Stories & Insights" />
      <meta property="og:description" content="Explore and search community stories, tech write-ups, lifestyle blogs, and more on ThinkHub." />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content="ThinkHub – Community Stories & Insights" />
      <meta property="twitter:description" content="Explore and search community stories, tech write-ups, lifestyle blogs, and more on ThinkHub." />
      <meta property="twitter:url" content={currentUrl} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {blogSchema && (
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      )}

      {/* Global Navbar with integrated search query */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} onPostSelect={setSelectedPost} />

      <header className="hero-section">
        <h1 className="hero-title">
          Welcome to ThinkHub! <span style={{ display: "inline-block", filter: "drop-shadow(0 2px 10px rgba(255, 111, 0, 0.45))" }}>✍️</span>
        </h1>
        <p className="hero-sub">A premium space to share your stories, insights, and thoughts with the world.</p>
      </header>

      <main className="app-container">
        {/* Global Recent Blogs Flexbox feed */}
        <section>
          <h2 className="section-title">Community Stories</h2>
          
          {/* Interactive Topic Filter Chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0 24px 0" }}>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", alignSelf: "center", marginRight: "8px" }}>
              Filter by topic:
            </span>
            {["All", "Tech", "AI", "Lifestyle", "Finance", "Music", "Cooking"].map((topic, i) => {
              const isActive = (selectedTopic.toLowerCase() === topic.toLowerCase());
              return (
                <button 
                  key={i} 
                  className="btn-secondary" 
                  style={{ 
                    padding: "4px 12px", 
                    fontSize: "12px", 
                    borderRadius: "15px",
                    background: isActive ? "var(--color-primary)" : "",
                    color: isActive ? "#ffffff" : "",
                    borderColor: isActive ? "var(--color-primary)" : ""
                  }}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic}
                </button>
              );
            })}
          </div>

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPost(p);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Read story: ${p.title} by ${p.name || "Anonymous"}`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex-post-main">
                      <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                        <span className="flex-post-tag">{p.topic}</span>
                        <span style={{ fontSize: "11px", background: "rgba(255, 111, 0, 0.08)", border: "1px solid rgba(255, 111, 0, 0.15)", padding: "2px 8px", borderRadius: "10px", color: "var(--color-primary)", fontWeight: "600" }}>
                          👤 {p.name || "Anonymous"}{p.username ? ` (@${p.username})` : ""}
                        </span>
                      </div>
                      <h3 className="flex-post-title">{p.title}</h3>
                      <p className="flex-post-snippet">
                        {p.desc && p.desc.length > 180 ? p.desc.slice(0, 180) + "..." : p.desc}
                      </p>
                    </div>
                    <div className="flex-post-actions" onClick={e => e.stopPropagation()}>
                      <span style={{ fontSize: "13px", color: "var(--text-dark)" }}>
                        {p.created_at ? new Date(p.created_at).toLocaleDateString() : "Just now"}
                      </span>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        {localStorage.getItem("username") && p.username === localStorage.getItem("username") && (
                          <button 
                            className="btn-secondary" 
                            style={{ padding: "6px 12px", fontSize: "12px", color: "var(--text-white)", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "6px" }}
                            onClick={() => deletePost(p._id)}
                            onMouseOver={e => { e.target.style.background = "rgba(239, 68, 68, 0.2)"; }}
                            onMouseOut={e => { e.target.style.background = "rgba(239, 68, 68, 0.1)"; }}
                          >
                            🗑️ Delete
                          </button>
                        )}
                        <button 
                          className="btn-secondary" 
                          style={{ padding: "8px 16px", fontSize: "13px" }}
                          onClick={() => setSelectedPost(p)}
                        >
                          Read 📖
                        </button>
                      </div>
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
            <button className="modal-close" onClick={() => setSelectedPost(null)} aria-label="Close details modal">✕</button>
            <h2 className="modal-title">{selectedPost.title}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px", color: "var(--text-dark)", fontSize: "13px", alignItems: "center" }}>
              <span style={{ background: "rgba(255, 111, 0, 0.08)", color: "var(--color-primary)", padding: "4px 10px", borderRadius: "12px", fontWeight: "700" }}>
                👤 {selectedPost.name || "Anonymous"}{selectedPost.username ? ` (@${selectedPost.username})` : ""}
              </span>
              <span>•</span>
              <span>Topic: <strong>{selectedPost.topic}</strong></span>
              <span>•</span>
              <span>Published: {selectedPost.created_at ? new Date(selectedPost.created_at).toLocaleDateString() : "Unknown"}</span>
            </div>
            <div className="modal-body">{selectedPost.desc}</div>
          </div>
        </div>
      )}

      {/* Reusable Enhanced Footer */}
      <Footer />
    </div>
  );
}

export default Home; 