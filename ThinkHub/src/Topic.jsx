import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

function Topic() {
  const { name }                = useParams();
  const navigate                = useNavigate();
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle]       = useState("");
  const [desc, setDesc]         = useState("");
  const [selected, setSelected] = useState(null);

  // Load posts from backend
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/posts/${name}`)
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, [name]);

  async function submitPost() {
    if (!title || !desc) { alert("Fill all fields!"); return; }

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, topic: name })
      });
      const data = await res.json();

      if (data.success) {
        setPosts([data.post, ...posts]);
        setTitle(""); setDesc(""); setShowForm(false);
      } else {
        alert(data.error || "Failed to add post");
      }
    } catch (err) {
      console.error("Add post error:", err);
      alert("Failed to submit post. Please try again.");
    }
  }
  
  async function deletePost(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p._id !== id));
      } else {
        alert("Failed to delete post");
      }
    } catch (err) {
      console.error("Delete post error:", err);
      alert("Failed to delete post. Please try again.");
    }
  }

  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.logo}>📝 ThinkHub</span>
        <button style={styles.back} onClick={() => navigate("/home")}>← Back</button>
      </nav>

      <div style={styles.hero}>
        <h1>{name}</h1>
        <p>Share your thoughts on {name}!</p>
        <button style={styles.addBtn} onClick={() => setShowForm(true)}>➕ Add Post</button>
      </div>

      {showForm && (
        <div style={styles.formBox}>
          <h3>New Post</h3>
          <input style={styles.input} placeholder="Title" onChange={e => setTitle(e.target.value)} />
          <textarea style={styles.input} placeholder="Write something..." rows="4" onChange={e => setDesc(e.target.value)} />
          <button style={styles.btn} onClick={submitPost}>Submit 🚀</button>
          <button style={styles.cancel} onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div style={styles.container}>
        <h2>{name} Posts</h2>
        {loading ? (
          <p style={{color:"#6c63ff", fontWeight:"bold"}}>Loading posts... ⏳</p>
        ) : (
          <>
            {posts.length === 0 && <p style={{color:"#888"}}>No posts yet. Be the first! 🙌</p>}
            <div style={styles.grid}>
              {posts.map((p, i) => (
                <div key={i} style={styles.card} onClick={() => setSelected(p)}>
                  <h3>{p.title}</h3>
                  <p>{p.desc.slice(0, 80)}...</p>
                  <button style={styles.del} onClick={e => { e.stopPropagation(); deletePost(p._id); }}>🗑️ Delete</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selected && (
        <div style={styles.overlay}>
          <div style={styles.full}>
            <button style={styles.close} onClick={() => setSelected(null)}>✕ Close</button>
            <h2>{selected.title}</h2>
            <p>{selected.desc}</p>
          </div>
        </div>
      )}

      <footer style={styles.footer}><p>© 2026 ThinkHub. All rights reserved.</p></footer>
    </div>
  );
}

const styles = {
  nav:       { background:"#6c63ff", padding:"16px 24px", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo:      { fontSize:"20px", fontWeight:"bold" },
  back:      { background:"white", color:"#6c63ff", border:"none", padding:"6px 14px", borderRadius:"8px", cursor:"pointer" },
  hero:      { background:"#6c63ff", color:"white", textAlign:"center", padding:"50px 20px" },
  addBtn:    { background:"white", color:"#6c63ff", border:"none", padding:"10px 24px", borderRadius:"8px", fontWeight:"bold", cursor:"pointer", marginTop:"16px" },
  formBox:   { background:"white", maxWidth:"500px", margin:"30px auto", padding:"30px", borderRadius:"12px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" },
  input:     { width:"100%", padding:"10px", marginBottom:"14px", border:"1px solid #ccc", borderRadius:"8px", fontSize:"15px", boxSizing:"border-box" },
  btn:       { width:"100%", padding:"10px", background:"#6c63ff", color:"white", border:"none", borderRadius:"8px", cursor:"pointer", marginBottom:"8px" },
  cancel:    { width:"100%", padding:"10px", background:"#ccc", color:"#333", border:"none", borderRadius:"8px", cursor:"pointer" },
  container: { maxWidth:"900px", margin:"40px auto", padding:"0 20px" },
  grid:      { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(250px, 1fr))", gap:"20px", marginTop:"20px" },
  card:      { background:"white", borderRadius:"12px", padding:"16px", boxShadow:"0 4px 12px rgba(0,0,0,0.08)", cursor:"pointer" },
  del:       { background:"#e74c3c", color:"white", border:"none", padding:"6px 12px", borderRadius:"6px", cursor:"pointer", marginTop:"10px" },
  overlay:   { position:"fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.85)", zIndex:999, overflowY:"auto" },
  full:      { background:"white", maxWidth:"700px", margin:"40px auto", borderRadius:"16px", padding:"30px" },
  close:     { background:"#e74c3c", color:"white", border:"none", padding:"8px 16px", borderRadius:"8px", cursor:"pointer", marginBottom:"16px" },
  footer:    { background:"#1a1a2e", color:"#aaa", textAlign:"center", padding:"20px", marginTop:"60px" }
};

export default Topic;