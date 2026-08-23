import { useNavigate } from "react-router-dom";

const topics = [
  { name: "Lifestyle", emoji: "🧘" }, { name: "Health", emoji: "❤️" },
  { name: "Fitness", emoji: "💪" },   { name: "Tech", emoji: "💻" },
  { name: "AI", emoji: "🤖" },        { name: "Cooking", emoji: "🍳" },
  { name: "Entertainment", emoji: "🎬" }, { name: "Movie Reviews", emoji: "🎥" },
  { name: "Music", emoji: "🎵" },     { name: "Podcast Reviews", emoji: "🎙️" },
  { name: "Investments", emoji: "📈" }, { name: "Money", emoji: "💰" },
  { name: "Finance", emoji: "🏦" },   { name: "Jokes", emoji: "😂" },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade">
      <nav className="navbar">
        <span className="nav-logo" onClick={() => navigate("/home")}>📝 ThinkHub</span> 
        <div className="nav-actions">
          <button className="btn-secondary" onClick={() => navigate("/about")}>About</button>
          <button className="btn-secondary" onClick={() => navigate("/contact")}>Contact</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1 className="hero-title">Welcome to ThinkHub! ✍️</h1>
        <p className="hero-sub">A premium space to share your stories, insights, and thoughts with the world.</p>
      </header>

      <main className="app-container">
        <h2 className="section-title">Explore Topics</h2>
        <div className="topics-grid">
          {topics.map((t, i) => (
            <div 
              key={i} 
              className="glass-card glass-card-hover topic-tile" 
              onClick={() => navigate("/topic/" + t.name)}
            >
              <span className="topic-tile-emoji">{t.emoji}</span>
              <span className="topic-tile-name">{t.name}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 ThinkHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home; 