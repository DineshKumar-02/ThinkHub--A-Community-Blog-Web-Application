import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

function Signup() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [age, setAge]         = useState("");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !age) { alert("Please fill all fields!"); return; }
    if (age < 13) { alert("You must be at least 13!"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },    
        body: JSON.stringify({ name, email, age })
      }); 

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/home"); 
      } else {
        alert(data.error || data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container animate-fade">
      <form className="glass-card auth-box animate-scale" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h2 className="auth-title">📝 ThinkHub</h2>
          <p className="auth-subtitle">Create an account to join the community</p>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            className="form-input" 
            placeholder="e.g. John Doe" 
            value={name}
            onChange={e => setName(e.target.value)} 
            disabled={loading} 
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            className="form-input" 
            placeholder="e.g. john@example.com" 
            type="email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            disabled={loading} 
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Age</label>
          <input 
            className="form-input" 
            placeholder="Minimum age 13" 
            type="number" 
            value={age}
            onChange={e => setAge(e.target.value)} 
            disabled={loading} 
            required
          />
        </div>

        <button 
          type="submit"
          className="btn-primary" 
          style={{ width: "100%", marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Signup;

