import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

function Navbar({ searchQuery, setSearchQuery, showSearch = false }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <nav className="navbar" onClick={() => setDropdownOpen(false)}>
      <span className="nav-logo" onClick={() => navigate("/home")}>📝 ThinkHub</span> 
      
      {/* Search box is displayed if requested (e.g. on Home page) */}
      {showSearch && (
        <div className="nav-search-container" onClick={e => e.stopPropagation()}>
          <span className="nav-search-icon">🔍</span>
          <input 
            className="form-input nav-search-input" 
            placeholder="Search blogs or topics..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="nav-actions" onClick={e => e.stopPropagation()}>
        {/* Cartoon Dark Mode Toggle Button */}
        <button 
          className="theme-toggle-btn" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>

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
  );
}

export default Navbar;
