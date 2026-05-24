import { useNavigate } from "react-router-dom";

const topics = [
  { name:"Lifestyle", emoji:"🧘" }, { name:"Health", emoji:"❤️" },
  { name:"Fitness", emoji:"💪" },   { name:"Tech", emoji:"💻" },
  { name:"AI", emoji:"🤖" },        { name:"Cooking", emoji:"🍳" },
  { name:"Entertainment", emoji:"🎬" }, { name:"Movie Reviews", emoji:"🎥" },
  { name:"Music", emoji:"🎵" },     { name:"Podcast Reviews", emoji:"🎙️" },
  { name:"Investments", emoji:"📈" }, { name:"Money", emoji:"💰" },
  { name:"Finance", emoji:"🏦" },   { name:"Jokes", emoji:"😂" },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.logo}>📝 ThinkHub</span>
        <div>
          <button style={styles.navBtn} onClick={() => navigate("/about")}>About</button>
          <button style={styles.navBtn} onClick={() => navigate("/contact")}>Contact</button>
        </div>
      </nav>

      <div style={styles.hero}>
        <h1>Welcome to ThinkHub! ✍️</h1>
        <p>Share your thoughts with the world</p>
      </div>

      <div style={styles.container}>
        <h2>Explore Topics</h2>
        <div style={styles.grid}>
          {topics.map((t, i) => (
            <div key={i} style={styles.circle} onClick={() => navigate("/topic/" + t.name)}>
              <div>{t.emoji}</div><div>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <footer style={styles.footer}><p>© 2026 ThinkHub. All rights reserved.</p></footer>
    </div>
  );
}

const styles = {
  nav:       { background:"#6c63ff", padding:"16px 24px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo:      { fontSize:"20px", fontWeight:"bold" },
  navBtn:    { background:"white", color:"#6c63ff", border:"none", padding:"6px 14px", borderRadius:"8px", cursor:"pointer", marginLeft:"10px" },
  hero:      { background:"#6c63ff", color:"white", textAlign:"center", padding:"50px 20px" },
  container: { maxWidth:"900px", margin:"40px auto", padding:"0 20px" },
  grid:      { display:"flex", flexWrap:"wrap", gap:"16px", justifyContent:"center", marginTop:"20px" },
  circle:    { width:"110px", height:"110px", borderRadius:"50%", border:"2px solid #6c63ff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:"bold", color:"#6c63ff", cursor:"pointer", textAlign:"center", padding:"10px" },
  footer:    { background:"#1a1a2e", color:"#aaa", textAlign:"center", padding:"20px", marginTop:"60px" }
};

export default Home;