import { useState } from "react";
import { API_BASE_URL } from "./config";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Contact() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    if (!name || !city || !email || !feedback) {
      alert("Please fill all fields!");
      return;
    }

    setSubmitting(true);
    
    // 1. Trigger the mailto client window redirection prefilled with the input content
    const subject = encodeURIComponent(`ThinkHub Feedback from ${name}`);
    const body = encodeURIComponent(
      `Hey Admin,\n\n` +
      `I've shared some feedback on ThinkHub! Here are my details:\n\n` +
      `👤 Name: ${name}\n` +
      `📍 City: ${city}\n` +
      `✉️ Email: ${email}\n\n` +
      `📝 Message:\n` +
      `"${feedback}"\n\n` +
      `Best,\n` +
      `${name}`
    );
    window.location.href = `mailto:dineshsudhkarakaran2706@gmail.com?subject=${subject}&body=${body}`;

    // 2. Also log feedback in the backend database for records
    try {
      await fetch(`${API_BASE_URL}/api/users/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, email, feedback })
      });
    } catch (err) {
      console.error("Database log error:", err);
    } finally {
      setName("");
      setCity("");
      setEmail("");
      setFeedback("");
      setSubmitting(false);
    }
  }

  const currentUrl = window.location.origin + "/contact";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ThinkHub",
    "description": "Reach out to the ThinkHub administrator with comments, suggestions, or ideas.",
    "url": currentUrl
  };

  return (
    <div className="animate-fade">
      {/* React 19 Native Hoisted Meta Tags */}
      <title>Contact & Feedback – ThinkHub</title>
      <meta name="description" content="Reach out to the ThinkHub administrator with comments, suggestions, or ideas." />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content="Contact & Feedback – ThinkHub" />
      <meta property="og:description" content="Reach out to the ThinkHub administrator with comments, suggestions, or ideas." />
      <meta property="og:url" content={currentUrl} />
      
      <meta property="twitter:title" content="Contact & Feedback – ThinkHub" />
      <meta property="twitter:description" content="Reach out to the ThinkHub administrator with comments, suggestions, or ideas." />
      <meta property="twitter:url" content={currentUrl} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">
        {JSON.stringify(contactSchema)}
      </script>

      <Navbar />

      <header className="hero-section" style={{ textAlign: "center", padding: "60px 24px 40px 24px" }}>
        <span style={{ fontSize: "50px", display: "block", marginBottom: "10px" }}>📬</span>
        <h1 className="hero-title" style={{ fontSize: "40px", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", margin: "0" }}>
          Contact Us
        </h1>
        <p className="hero-sub" style={{ maxWidth: "600px", margin: "10px auto 0 auto" }}>Have something to say? Reach out!</p>
      </header>

      <main className="app-container" style={{ display: "flex", justifyContent: "center", paddingBottom: "40px" }}>
        <section className="glass-card animate-scale" style={{ padding: "40px", width: "100%", maxWidth: "600px", textAlign: "left" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", color: "var(--text-white)", margin: "0 0 8px 0" }}>Send Feedback</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: "0" }}>
              Fill in the fields below to compose and send your feedback directly.
            </p>
          </div>

          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">Your Name</label>
              <input
                id="contact-name"
                className="form-input"
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-city" className="form-label">City</label>
              <input
                id="contact-city"
                className="form-input"
                placeholder="e.g. New York"
                value={city}
                onChange={e => setCity(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">Email Address</label>
              <input
                id="contact-email"
                className="form-input"
                placeholder="e.g. john@example.com"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-feedback" className="form-label">Feedback Message</label>
              <textarea
                id="contact-feedback"
                className="form-input"
                placeholder="Write your feedback, questions or suggestions here..."
                rows="5"
                style={{ resize: "vertical" }}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                disabled={submitting}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%", marginTop: "10px", padding: "14px" }}
              disabled={submitting}
            >
              {submitting ? "Sending Feedback..." : "Send Feedback 🚀"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;