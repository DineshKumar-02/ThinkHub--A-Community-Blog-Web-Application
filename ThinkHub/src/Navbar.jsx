import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./assets/logo.jpg";
import { API_BASE_URL } from "./config";

const topics = [
  { name: "Lifestyle", emoji: "🧘" },
  { name: "Health", emoji: "❤️" },
  { name: "Fitness", emoji: "💪" },
  { name: "Tech", emoji: "💻" },
  { name: "AI", emoji: "🤖" },
  { name: "Cooking", emoji: "🍳" },
  { name: "Entertainment", emoji: "🎬" },
  { name: "Movie Reviews", emoji: "🎥" },
  { name: "Music", emoji: "🎵" },
  { name: "Podcast Reviews", emoji: "🎙️" },
  { name: "Investments", emoji: "📈" },
  { name: "Money", emoji: "💰" },
  { name: "Finance", emoji: "🏦" },
  { name: "Jokes", emoji: "😂" },
];

function Navbar({ searchQuery, setSearchQuery, showSearch = false, onPostSelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sync theme changes with documentElement class and LocalStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown or mobile menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch posts for live search indexing
  useEffect(() => {
    if (!showSearch) return;
    fetch(`${API_BASE_URL}/api/posts`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error loading search posts:", err));
  }, [showSearch]);

  const username = localStorage.getItem("username");

  const matchingTopics = searchQuery ? topics.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];
  
  const matchingPosts = searchQuery ? posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.topic.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <>
      <header className="navbar-wrapper">
        <nav className="navbar" role="navigation" aria-label="Main Navigation">
          <div className="navbar-left">
            <div 
              className="nav-logo" 
              onClick={() => { setMobileMenuOpen(false); navigate("/home"); }} 
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === "Enter") { setMobileMenuOpen(false); navigate("/home"); } }}
            >
              <img src={logo} alt="ThinkHub Logo" style={{ width: "30px", height: "30px", borderRadius: "6px", objectFit: "cover" }} />
              <span>ThinkHub</span>
            </div>
          </div>
          
          {/* Desktop & Tablet Search Box */}
          {showSearch && (
            <div className="nav-search-container desktop-search-container" onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
              <span className="nav-search-icon" aria-hidden="true">🔍</span>
              <input 
                className="form-input nav-search-input" 
                placeholder="Search blogs or topics..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search blogs or topics"
              />
              {/* Live Search Results Dropdown */}
              {searchQuery && (
                <div 
                  className="glass-card animate-scale nav-search-dropdown" 
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "8px",
                    padding: "16px",
                    boxShadow: "var(--shadow-hover)",
                    zIndex: 1002,
                    maxHeight: "320px",
                    overflowY: "auto",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    border: "1px solid var(--border-glass)"
                  }}
                >
                  {/* Matching Topics */}
                  {matchingTopics.length > 0 && (
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.05em" }}>
                        Topics
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {matchingTopics.map((t, idx) => (
                          <button 
                            key={idx} 
                            className="btn-secondary" 
                            style={{ padding: "4px 10px", fontSize: "11px", borderRadius: "12px" }}
                            onClick={() => {
                              setSearchQuery("");
                              navigate("/topic/" + t.name);
                            }}
                          >
                            {t.emoji} {t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Stories */}
                  {matchingPosts.length > 0 && (
                    <div style={{ borderTop: matchingTopics.length > 0 ? "1px solid var(--border-glass)" : "none", paddingTop: matchingTopics.length > 0 ? "10px" : "0" }}>
                      <div style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px", letterSpacing: "0.05em" }}>
                        Stories
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {matchingPosts.slice(0, 5).map((p, idx) => (
                          <button 
                            key={idx} 
                            style={{ 
                              background: "transparent", 
                              border: "none", 
                              textAlign: "left", 
                              fontSize: "13px", 
                              color: "var(--text-white)", 
                              cursor: "pointer",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              width: "100%",
                              fontFamily: "inherit",
                              transition: "background var(--transition-fast)"
                            }}
                            onClick={() => {
                              setSearchQuery("");
                              if (onPostSelect) {
                                onPostSelect(p);
                              } else {
                                navigate("/home");
                              }
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "rgba(255, 111, 0, 0.08)"}
                            onMouseOut={e => e.currentTarget.style.background = "transparent"}
                          >
                            📝 {p.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingTopics.length === 0 && matchingPosts.length === 0 && (
                    <div style={{ color: "var(--text-muted)", fontSize: "12px", textAlign: "center", padding: "8px" }}>
                      No topics or stories found for "{searchQuery}" 🔍
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="nav-actions desktop-nav-actions" onClick={e => e.stopPropagation()}>
            <button className="btn-secondary" onClick={() => navigate("/home")}>Home</button>

            {/* Categories Dropdown */}
            <div className="dropdown-container">
              <button 
                className="btn-secondary" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-controls="categories-menu"
              >
                Categories ▾
              </button>
              {dropdownOpen && (
                <div id="categories-menu" role="menu" className="dropdown-menu animate-scale">
                  {topics.map((t, idx) => (
                    <button 
                      key={idx} 
                      role="menuitem"
                      className="dropdown-item" 
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/topic/" + t.name);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDropdownOpen(false);
                          navigate("/topic/" + t.name);
                        }
                      }}
                    >
                      <span role="img" aria-label={t.name}>{t.emoji}</span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button className="btn-secondary" onClick={() => navigate("/about")}>About</button>
            <button className="btn-secondary" onClick={() => navigate("/contact")}>Contact</button>

            {/* User Profile Navigation Button */}
            {username ? (
              <button 
                className="btn-primary" 
                style={{ padding: "10px 16px", fontSize: "14px", borderRadius: "10px" }}
                onClick={() => navigate("/profile")}
              >
                👤 Profile
              </button>
            ) : (
              <button 
                className="btn-primary" 
                style={{ padding: "10px 16px", fontSize: "14px", borderRadius: "10px" }}
                onClick={() => navigate("/")}
              >
                🔑 Sign In
              </button>
            )}
          </div>

          {/* Mobile Right Controls: Hamburger Toggle */}
          <div className="mobile-nav-toggle-wrapper">
            <button 
              className={`hamburger-btn ${mobileMenuOpen ? "is-active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </nav>

        {/* Mobile Search Bar Row (When on Home page) */}
        {showSearch && (
          <div className="mobile-search-row">
            <div className="nav-search-container mobile-inline-search" onClick={e => e.stopPropagation()}>
              <span className="nav-search-icon" aria-hidden="true">🔍</span>
              <input 
                className="form-input nav-search-input" 
                placeholder="Search blogs or topics..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search blogs or topics"
              />
              {/* Mobile Search Results */}
              {searchQuery && (
                <div className="glass-card animate-scale nav-search-dropdown mobile-search-dropdown">
                  {matchingTopics.length > 0 && (
                    <div>
                      <div style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}>
                        Topics
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {matchingTopics.map((t, idx) => (
                          <button 
                            key={idx} 
                            className="btn-secondary" 
                            style={{ padding: "5px 10px", fontSize: "12px", borderRadius: "12px" }}
                            onClick={() => {
                              setSearchQuery("");
                              navigate("/topic/" + t.name);
                            }}
                          >
                            {t.emoji} {t.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingPosts.length > 0 && (
                    <div style={{ borderTop: matchingTopics.length > 0 ? "1px solid var(--border-glass)" : "none", paddingTop: matchingTopics.length > 0 ? "10px" : "0" }}>
                      <div style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}>
                        Stories
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {matchingPosts.slice(0, 5).map((p, idx) => (
                          <button 
                            key={idx} 
                            className="mobile-search-item"
                            onClick={() => {
                              setSearchQuery("");
                              if (onPostSelect) {
                                onPostSelect(p);
                              } else {
                                navigate("/home");
                              }
                            }}
                          >
                            📝 {p.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchingTopics.length === 0 && matchingPosts.length === 0 && (
                    <div style={{ color: "var(--text-muted)", fontSize: "12px", textAlign: "center", padding: "8px" }}>
                      No topics or stories found for "{searchQuery}" 🔍
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Slide-Down Menu Drawer */}
        {mobileMenuOpen && (
          <>
            <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
            <div id="mobile-nav-menu" className="mobile-nav-panel animate-slide">
              <div className="mobile-nav-links">
                <button 
                  className="mobile-nav-link-btn" 
                  onClick={() => { setMobileMenuOpen(false); navigate("/home"); }}
                >
                  <span className="mobile-nav-icon">🏠</span>
                  <span>Home Feed</span>
                </button>

                {/* Collapsible Mobile Categories Section */}
                <div className="mobile-categories-wrapper">
                  <button 
                    className="mobile-nav-link-btn mobile-accordion-btn"
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    aria-expanded={mobileCategoriesOpen}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="mobile-nav-icon">📂</span>
                      <span>Categories</span>
                    </div>
                    <span className="accordion-chevron">{mobileCategoriesOpen ? "▲" : "▼"}</span>
                  </button>

                  {mobileCategoriesOpen && (
                    <div className="mobile-categories-grid animate-fade">
                      {topics.map((t, idx) => (
                        <button 
                          key={idx} 
                          className="mobile-topic-chip"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate("/topic/" + t.name);
                          }}
                        >
                          <span>{t.emoji}</span>
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  className="mobile-nav-link-btn" 
                  onClick={() => { setMobileMenuOpen(false); navigate("/about"); }}
                >
                  <span className="mobile-nav-icon">👋</span>
                  <span>About Us</span>
                </button>

                <button 
                  className="mobile-nav-link-btn" 
                  onClick={() => { setMobileMenuOpen(false); navigate("/contact"); }}
                >
                  <span className="mobile-nav-icon">📬</span>
                  <span>Contact & Feedback</span>
                </button>

                {username ? (
                  <button 
                    className="mobile-nav-link-btn mobile-nav-profile-btn" 
                    onClick={() => { setMobileMenuOpen(false); navigate("/profile"); }}
                  >
                    <span className="mobile-nav-icon">👤</span>
                    <span>My Profile (@{username})</span>
                  </button>
                ) : (
                  <button 
                    className="mobile-nav-link-btn mobile-nav-profile-btn" 
                    onClick={() => { setMobileMenuOpen(false); navigate("/"); }}
                  >
                    <span className="mobile-nav-icon">🔑</span>
                    <span>Sign In / Register</span>
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </header>

      {/* Cartoon Dark Mode Toggle Button (Floating) */}
      <button 
        className="theme-toggle-btn" 
        onClick={() => setIsDarkMode(!isDarkMode)}
        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </>
  );
}

export default Navbar;
