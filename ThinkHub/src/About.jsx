import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.logo}>📝 ThinkHub</span>
        <button style={styles.back} onClick={() => navigate("/home")}>← Back</button>
      </nav>

      <div style={styles.hero}>
        <h1>👋 About Us</h1>
      </div>

      <div style={styles.container}>
        <p style={styles.text}>Hey there! Welcome to ThinkHub — a place where anyone can come and share what's on their mind.</p>
        <p style={styles.text}>Whether it's something you learned today, a random thought, an opinion or just a cool story — this is your space to share it!</p>
        <p style={styles.text}>No rules, no pressure. Just real people sharing real stuff. Every voice matters here. 🙌</p>
      </div>

      <footer style={styles.footer}><p>© 2026 ThinkHub. All rights reserved.</p></footer>
    </div>
  );
}

const styles = {
  nav:       { background:"#6c63ff", padding:"16px 24px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo:      { fontSize:"20px", fontWeight:"bold" },
  back:      { background:"white", color:"#6c63ff", border:"none", padding:"6px 14px", borderRadius:"8px", cursor:"pointer" },
  hero:      { background:"#6c63ff", color:"white", textAlign:"center", padding:"50px 20px" },
  container: { maxWidth:"600px", margin:"40px auto", padding:"0 20px" },
  text:      { fontSize:"16px", color:"#555", lineHeight:"1.8", marginBottom:"16px" },
  footer:    { background:"#1a1a2e", color:"#aaa", textAlign:"center", padding:"20px", marginTop:"60px" }
};

export default About; 
