import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SubmitPaper() {
  const [form, setForm] = useState({ title: "", abstract: "", keywords: "", domain: "" });
  const [paper, setPaper] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();

    data.append("title", form.title);
    data.append("abstract", form.abstract);
    data.append("keywords", form.keywords);
    data.append("domain", form.domain);
    data.append("paper", paper);

    try {
      const res = await axios.post("http://localhost:5000/api/papers/submit", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch {
      alert("Paper submission failed");
    }
  };

  return (
    <div className="app-bg">
      <div className="page-card large">
        <h2>Submit Research Paper</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Paper Title" onChange={handleChange} required />
          <textarea name="abstract" placeholder="Abstract" onChange={handleChange} required />
          <input name="keywords" placeholder="Keywords" onChange={handleChange} />
          <input name="domain" placeholder="Research Domain" onChange={handleChange} />
          <input type="file" accept="application/pdf" onChange={(e) => setPaper(e.target.files[0])} required />
          <button>Submit Paper</button>
        </form>
        <Link to="/participant"><p className="link">Back to Dashboard</p></Link>
      </div>
    </div>
  );
}

export default SubmitPaper;
