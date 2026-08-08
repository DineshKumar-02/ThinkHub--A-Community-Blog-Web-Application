import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

function Signup() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [age, setAge]         = useState("");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  async function handleSubmit() {
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
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>📝 ThinkHub – A Community Blog Web Application
</h2>
        <p style={styles.sub}>Create your account</p>
        <input style={styles.input} placeholder="Name"  onChange={e => setName(e.target.value)} disabled={loading} />
        <input style={styles.input} placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} disabled={loading} />
        <input style={styles.input} placeholder="Age"   type="number" onChange={e => setAge(e.target.value)} disabled={loading} />
        <button 
          style={loading ? { ...styles.btn, opacity: 0.7, cursor: "not-allowed" } : styles.btn} 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#f0f4ff" },
  box:       { background:"white", padding:"40px", borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)", width:"320px" },
  title:     { textAlign:"center", color:"#6c63ff", marginBottom:"4px" },
  sub:       { textAlign:"center", color:"#888", marginBottom:"20px", fontSize:"14px" },
  input:     { width:"100%", padding:"10px", marginBottom:"14px", border:"1px solid #ccc", borderRadius:"8px", fontSize:"15px", boxSizing:"border-box" },
  btn:       { width:"100%", padding:"10px", background:"#6c63ff", color:"white", border:"none", borderRadius:"8px", fontSize:"15px", cursor:"pointer" }
};


export default Signup;

