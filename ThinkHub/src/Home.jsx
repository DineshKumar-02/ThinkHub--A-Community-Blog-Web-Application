import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlurhashImage from "./BlurhashImage";
import { API_BASE_URL } from "./config";

const topics = [
  { name: "Lifestyle", emoji: "🧘", bg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=350&auto=format&fit=crop&q=60", hash: "LDO~7xkC.Txu_4xt%MIU?bkCWAWB" },
  { name: "Health", emoji: "❤️", bg: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=350&auto=format&fit=crop&q=60", hash: "LEHV6nWB2yk8.Tj[f6a{g5oeRxoL" },
  { name: "Fitness", emoji: "💪", bg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=350&auto=format&fit=crop&q=60", hash: "L9H2cT00I.=_00~q_39F-pE1?Hae" },
  { name: "Tech", emoji: "💻", bg: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=350&auto=format&fit=crop&q=60", hash: "L36Y7#Rj00%M00WB~qof00Rj?bof" },
  { name: "AI", emoji: "🤖", bg: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=350&auto=format&fit=crop&q=60", hash: "LFN,R.xt?bIA_3WBoffQ?bWBofae" },
  { name: "Cooking", emoji: "🍳", bg: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=350&auto=format&fit=crop&q=60", hash: "LHN,bXxu.Tog_4ofofj[R*WBofof" },
  { name: "Entertainment", emoji: "🎬", bg: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=350&auto=format&fit=crop&q=60", hash: "L8F5,~D%00~q00_3%Mxu00Rj?bof" },
  { name: "Movie Reviews", emoji: "🎥", bg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=350&auto=format&fit=crop&q=60", hash: "L6A,p=%M00~q00_3%Mxu00Rj?bof" },
  { name: "Music", emoji: "🎵", bg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=350&auto=format&fit=crop&q=60", hash: "LKF5,~D%00~q00_3%Mxu00Rj?bof" },
  { name: "Podcast Reviews", emoji: "🎙️", bg: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=350&auto=format&fit=crop&q=60", hash: "L5A,p=%M00~q00_3%Mxu00Rj?bof" },
  { name: "Investments", emoji: "📈", bg: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=350&auto=format&fit=crop&q=60", hash: "L9H2cT00I.=_00~q_39F-pE1?Hae" },
  { name: "Money", emoji: "💰", bg: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=350&auto=format&fit=crop&q=60", hash: "LDO~7xkC.Txu_4xt%MIU?bkCWAWB" },
  { name: "Finance", emoji: "🏦", bg: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=350&auto=format&fit=crop&q=60", hash: "LEHV6nWB2yk8.Tj[f6a{g5oeRxoL" },
  { name: "Jokes", emoji: "😂", bg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=350&auto=format&fit=crop&q=60", hash: "LFN,R.xt?bIA_3WBoffQ?bWBofae" },
];

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Filter topics based on search query
  const filteredTopics = topics.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade" onClick={() => setDropdownOpen(false)}>
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <span className="nav-logo" onClick={() => navigate("/home")}>📝 ThinkHub</span> 
        
        {/* Central Search Bar */}
        <div className="nav-search-container">
          <span className="nav-search-icon">🔍</span>
          <input 
            className="form-input nav-search-input" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          {/* Categories Dropdown */}
          <div className="dropdown-container">
            <button className="btn-secondary" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Categories ▾
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu animate-scale">
                {topics.map((t, idx) => (
                  <div 
                    key={idx} 
                    className="dropdown-item" 
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/topic/" + t.name);
                    }}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="btn-secondary" onClick={() => navigate("/about")}>About</button>
          <button className="btn-secondary" onClick={() => navigate("/contact")}>Contact</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1 className="hero-title">Welcome to ThinkHub! ✍️</h1>
        <p className="hero-sub">A premium space to share your stories, insights, and thoughts with the world.</p>
      </header>

      <main className="app-container">
        {/* Topics grid filtering */}
        <section>
          <h2 className="section-title">Explore Topics</h2>
          {filteredTopics.length === 0 ? (
            <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
              No categories found matching "{searchQuery}"
            </p>
          ) : (
            <div className="topics-grid">
              {filteredTopics.map((t, i) => (
                <div 
                  key={i} 
                  className="glass-card glass-card-hover topic-tile" 
                  onClick={() => navigate("/topic/" + t.name)}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <BlurhashImage
                    hash={t.hash}
                    src={t.bg}
                    alt={t.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      filter: "blur(3px) brightness(0.65)",
                      transform: "scale(1.15)",
                      zIndex: 1,
                      pointerEvents: "none"
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div className="topic-tile-emoji">{t.emoji}</div>
                    <div className="topic-tile-name" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                      {t.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Global Recent Blogs Flexbox feed */}
        <section style={{ marginTop: "60px" }}>
          <h2 className="section-title">Recent Community Stories</h2>
          {postsLoading ? (
            <p style={{ color: "var(--color-primary)", fontWeight: "600", marginTop: "20px" }}>
              Loading stories... ⏳
            </p>
          ) : (
            <div className="flex-posts-container">
              {posts.length === 0 ? (
                <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
                  No stories shared yet. Be the first to share! 🙌
                </p>
              ) : (
                posts.map((p, idx) => (
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