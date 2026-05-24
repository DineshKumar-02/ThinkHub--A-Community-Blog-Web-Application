import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.logo}>📝 ThinkHub</span>
        <button style={styles.back} onClick={() => navigate("/home")}>← Back</button>
      </nav>

      <div style={styles.container}>
        <h2 style={styles.title}>📬 Contact Us</h2>
        <p style={styles.sub}>Have something to say? Reach out!</p>
        <a style={styles.email} href="mailto:dineshsudhkarakaran2706@gmail.com">
          dineshsudhkarakaran2706@gmail.com
        </a>
      </div>

      <footer style={styles.footer}><p>© 2026 ThinkHub. All rights reserved.</p></footer>
    </div>
  );
}

const styles = {
  nav:       { background:"#6c63ff", padding:"16px 24px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo:      { fontSize:"20px", fontWeight:"bold" },
  back:      { background:"white", color:"#6c63ff", border:"none", padding:"6px 14px", borderRadius:"8px", cursor:"pointer" },
  container: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60vh" },
  title:     { fontSize:"28px", color:"#333", marginBottom:"10px" },
  sub:       { color:"#888", marginBottom:"20px" },
  email:     { fontSize:"18px", color:"#6c63ff", fontWeight:"bold", textDecoration:"none" },
  footer:    { background:"#1a1a2e", color:"#aaa", textAlign:"center", padding:"20px", marginTop:"20px" }
};

export default Contact;