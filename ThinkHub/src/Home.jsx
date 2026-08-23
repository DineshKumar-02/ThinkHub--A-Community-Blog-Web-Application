import { useNavigate } from "react-router-dom";
import BlurhashImage from "./BlurhashImage";

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
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Blurred Image Background using Blurhash Placeholder */}
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
              {/* Card Label and Emoji Content */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="topic-tile-emoji">{t.emoji}</div>
                <div className="topic-tile-name" style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                  {t.name}
                </div>
              </div>
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