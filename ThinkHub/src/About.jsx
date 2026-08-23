import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  const navigate = useNavigate();
  return ( 
    <div className="animate-fade">
      <Navbar />

      <header className="hero-section">
        <h1 className="hero-title">👋 About Us</h1>
      </header>

      <main className="info-container glass-card animate-scale" style={{ padding: "40px" }}>
        <p className="info-text">Hey there! Welcome to ThinkHub — a place where anyone can come and share what's on their mind.</p>
        <p className="info-text">Whether it's something you learned today, a random thought, an opinion, or just a cool story — this is your space to share it!</p>
        <p className="info-text">No rules, no pressure. Just real people sharing real stuff. Every voice matters here. 🙌</p>
      </main>

      <Footer />
    </div>
  );
}

export default About;