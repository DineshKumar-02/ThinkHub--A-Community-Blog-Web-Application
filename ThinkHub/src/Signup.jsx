import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge]     = useState("");
  const navigate          = useNavigate();

  async function handleSubmit() {
    if (!name || !email || !age) { alert("Please fill all fields!"); return; }
    if (age < 13) { alert("You must be at least 13!"); return; }

    const res = await fetch("https://thinkhub-a-community-blog-web-application.onrender.com/api/users/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, age })
});
    const data = await res.json();

    if (data.success) {
      navigate("/home");
    } else {
      alert("Something went wrong!");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>📝 ThinkHub – A Community Blog Web Application
</h2>
        <p style={styles.sub}>Create your account</p>
        <input style={styles.input} placeholder="Name"  onChange={e => setName(e.target.value)} />
        <input style={styles.input} placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} />
        <input style={styles.input} placeholder="Age"   type="number" onChange={e => setAge(e.target.value)} />
        <button style={styles.btn} onClick={handleSubmit}>Sign Up</button>
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