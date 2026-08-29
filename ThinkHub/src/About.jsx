import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  const navigate = useNavigate();
  const currentUrl = window.location.origin + "/about";

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ThinkHub",
    "description": "Learn about our mission to make knowledge infinite by sharing stories, lifestyle tips, and tech tutorials.",
    "url": currentUrl
  };

  return ( 
    <div className="animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>About ThinkHub – Our Mission & Values</title>
      <meta name="description" content="Learn about our mission to make knowledge infinite by sharing stories, lifestyle tips, and tech tutorials." />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content="About ThinkHub – Our Mission & Values" />
      <meta property="og:description" content="Learn about our mission to make knowledge infinite by sharing stories, lifestyle tips, and tech tutorials." />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content="About ThinkHub – Our Mission & Values" />
      <meta property="twitter:description" content="Learn about our mission to make knowledge infinite by sharing stories, lifestyle tips, and tech tutorials." />
      <meta property="twitter:url" content={currentUrl} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(aboutSchema)}
      </script>

      <Navbar />

      <header className="hero-section">
        <span style={{ fontSize: "clamp(36px, 8vw, 50px)", display: "block", marginBottom: "8px" }}>👋</span>
        <h1 className="hero-title">
          About Us
        </h1>
        <p className="hero-sub">Get to know the vision and heart behind the platform.</p>
      </header>

      <main className="app-container">
        <section className="glass-card animate-scale" style={{ padding: "clamp(20px, 4vw, 36px)", marginBottom: "30px" }}>
          <p style={{ fontSize: "15px", color: "var(--text-light)", lineHeight: "1.8", marginBottom: "16px" }}>
            Hey there! Welcome to ThinkHub — a place where anyone can come and share what's on their mind.
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-light)", lineHeight: "1.8", marginBottom: "16px" }}>
            Whether it's something you learned today, a random thought, an opinion or just a cool story — this is your space to share it!
          </p>
          <p style={{ fontSize: "15px", color: "var(--text-light)", lineHeight: "1.8", marginBottom: "0" }}>
            No rules, no pressure. Just real people sharing real stuff. Every voice matters here. 🙌
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;