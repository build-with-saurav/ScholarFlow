import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [papers, setPapers] = useState([]);

  const fetchPapers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/papers/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPapers(res.data);
    } catch {
      alert("Failed to fetch papers");
    }
  };

  const reviewPaper = async (id, status) => {
    const token = localStorage.getItem("token");
    const feedback = prompt("Enter feedback:");

    try {
      await axios.put(
        `http://localhost:5000/api/papers/review/${id}`,
        { status, admin_feedback: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPapers();
    } catch {
      alert("Review failed");
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <div className="app-bg">
      <div className="dashboard-card">
        <h2>Admin Dashboard</h2>
        <p className="muted">Review all submitted papers</p>
        <Link to="/">
          <button className="yellow-btn">Home</button>
        </Link>
      </div>

      {papers.map((paper) => (
        <div className="paper-card" key={paper.id}>
          <h3>{paper.title}</h3>
          <p><b>Author:</b> {paper.full_name}</p>
          <p><b>Email:</b> {paper.email}</p>
          <p><b>College:</b> {paper.college}</p>
          <p><b>Abstract:</b> {paper.abstract}</p>
          <p><b>Status:</b> {paper.status}</p>
          <p><b>Feedback:</b> {paper.admin_feedback || "No feedback"}</p>

          {paper.file_path && (
            <a
              href={`http://localhost:5000/${paper.file_path}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="yellow-btn">View / Download PDF</button>
            </a>
          )}

          <div className="action-row">
            <button
              className="accept-btn"
              onClick={() => reviewPaper(paper.id, "accepted")}
            >
              Accept
            </button>

            <button
              className="reject-btn"
              onClick={() => reviewPaper(paper.id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
