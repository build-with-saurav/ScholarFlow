import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyPapers() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/papers/my-papers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPapers(res.data);
      } catch {
        alert("Failed to fetch papers");
      }
    };
    fetchPapers();
  }, []);

  return (
    <div className="app-bg">
      <div className="dashboard-card">
        <h2>My Papers</h2>
        <Link to="/participant"><button className="yellow-btn">Back to Dashboard</button></Link>
      </div>

      {papers.map((paper) => (
        <div className="paper-card" key={paper.id}>
          <h3>{paper.title}</h3>
          <p><b>Abstract:</b> {paper.abstract}</p>
          <p><b>Keywords:</b> {paper.keywords}</p>
          <p><b>Domain:</b> {paper.domain}</p>
          <p><b>Status:</b> {paper.status}</p>
          <p><b>Feedback:</b> {paper.admin_feedback || "No feedback yet"}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPapers;
