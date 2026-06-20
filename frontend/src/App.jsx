import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [papers, setPapers] = useState([]);
  const [filter, setFilter] = useState("all");

  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
  });

  const [paperForm, setPaperForm] = useState({
    title: "",
    abstract: "",
    keywords: "",
    domain: "",
    paper: null,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setPage(JSON.parse(savedUser).role === "admin" ? "admin" : "participant");
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setPage("home");
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/signup`, signup);
      alert(res.data.message);
      setPage("signin");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSignin = async () => {
    try {
      const res = await axios.post(`${API}/api/auth/signin`, signin);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
      setPage(res.data.user.role === "admin" ? "admin" : "participant");
    } catch {
      alert("Invalid email or password");
    }
  };

  const fetchPapers = async () => {
    try {
      const url =
        user?.role === "admin"
          ? `${API}/api/papers/all`
          : `${API}/api/papers/my-papers`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPapers(res.data);
    } catch {
      alert("Failed to fetch papers");
    }
  };

  useEffect(() => {
    if (user) fetchPapers();
  }, [user]);

  const submitPaper = async () => {
    const data = new FormData();
    data.append("title", paperForm.title);
    data.append("abstract", paperForm.abstract);
    data.append("keywords", paperForm.keywords);
    data.append("domain", paperForm.domain);
    data.append("paper", paperForm.paper);

    try {
      const res = await axios.post(`${API}/api/papers/submit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      fetchPapers();
      setPage("participant");
    } catch {
      alert("Paper submission failed");
    }
  };

  const reviewPaper = async (id, status) => {
    const feedback = prompt("Enter feedback:");
    try {
      await axios.put(
        `${API}/api/papers/review/${id}`,
        { status, admin_feedback: feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review updated. Email notification will be sent if backend email is configured.");
      fetchPapers();
    } catch {
      alert("Review failed");
    }
  };

  const filteredPapers =
    filter === "all" ? papers : papers.filter((p) => p.status === filter);

  const analytics = {
    total: papers.length,
    pending: papers.filter((p) => p.status === "pending").length,
    accepted: papers.filter((p) => p.status === "accepted").length,
    rejected: papers.filter((p) => p.status === "rejected").length,
  };

  if (!user && page !== "home" && page !== "signin" && page !== "signup") {
    setPage("signin");
  }

  return (
    <div className={theme === "dark" ? "site dark" : "site light"}>
      {page === "home" && (
        <>
          <nav className="top-nav">
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("signin")}>Sign In</button>
            <button onClick={() => setPage("signup")}>Sign Up</button>
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>

          <section className="section hero">
            <p className="tag">Academic Research Portal</p>
            <h1>ScholarFlow</h1>
            <p className="hero-text">
              Submit research papers, track status, and manage admin review in one platform.
            </p>
          </section>

          <section className="section compact">
            <div className="auth-box">
              <h2>ScholarFlow</h2>
              <p>Portal Access</p>
              <button onClick={() => setPage("signin")}>Sign In</button>
              <button className="yellow-btn" onClick={() => setPage("signup")}>
                New User? Sign Up
              </button>
            </div>
          </section>

          <section className="section content">
            <h2>About</h2>
            <p>
              ScholarFlow is a full-stack research paper submission and review system.
              Participants can upload papers and track their status. Admins can review,
              accept, reject, download papers, and provide feedback.
            </p>
          </section>

          <section className="section content">
            <h2>Contact</h2>
            <p>Email: support@scholarflow.com | Phone: +91 98765 43210</p>
          </section>
        </>
      )}

      {page === "signup" && (
        <div className="app-bg">
          <div className="page-card">
            <h2>Create Account</h2>
            <input placeholder="Full Name" onChange={(e) => setSignup({ ...signup, full_name: e.target.value })} />
            <input placeholder="Email" onChange={(e) => setSignup({ ...signup, email: e.target.value })} />
            <input placeholder="Phone" onChange={(e) => setSignup({ ...signup, phone: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setSignup({ ...signup, password: e.target.value })} />
            <input placeholder="College / Organization" onChange={(e) => setSignup({ ...signup, college: e.target.value })} />
            <button onClick={handleSignup}>Create Account</button>
            <p className="link" onClick={() => setPage("signin")}>Already have account? Sign In</p>
          </div>
        </div>
      )}

      {page === "signin" && (
        <div className="app-bg">
          <div className="page-card">
            <h2>Sign In</h2>
            <input placeholder="Email" onChange={(e) => setSignin({ ...signin, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setSignin({ ...signin, password: e.target.value })} />
            <button onClick={handleSignin}>Sign In</button>
            <p className="link" onClick={() => setPage("signup")}>New user? Create account</p>
          </div>
        </div>
      )}

      {user?.role === "participant" && page === "participant" && (
        <div className="app-bg">
          <div className="dashboard-card">
            <h2>Participant Dashboard</h2>
            <p><b>Name:</b> {user.full_name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Role:</b> {user.role}</p>
            <button onClick={() => setPage("submit")}>Submit Paper</button>
            <button className="yellow-btn" onClick={fetchPapers}>Refresh History</button>
            <button onClick={logout}>Logout</button>
          </div>

          {papers.map((paper) => (
            <div className="paper-card" key={paper.id}>
              <h3>{paper.title}</h3>
              <p><b>Status:</b> {paper.status}</p>
              <p><b>Feedback:</b> {paper.admin_feedback || "No feedback yet"}</p>
              <p><b>Domain:</b> {paper.domain}</p>
            </div>
          ))}
        </div>
      )}

      {page === "submit" && (
        <div className="app-bg">
          <div className="page-card large">
            <h2>Submit Research Paper</h2>
            <input placeholder="Title" onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })} />
            <textarea placeholder="Abstract" onChange={(e) => setPaperForm({ ...paperForm, abstract: e.target.value })} />
            <input placeholder="Keywords" onChange={(e) => setPaperForm({ ...paperForm, keywords: e.target.value })} />
            <input placeholder="Domain" onChange={(e) => setPaperForm({ ...paperForm, domain: e.target.value })} />
            <input type="file" accept="application/pdf" onChange={(e) => setPaperForm({ ...paperForm, paper: e.target.files[0] })} />
            <button onClick={submitPaper}>Submit Paper</button>
            <button className="yellow-btn" onClick={() => setPage("participant")}>Back</button>
          </div>
        </div>
      )}

      {user?.role === "admin" && page === "admin" && (
        <div className="app-bg">
          <div className="dashboard-card">
            <h2>Admin Dashboard</h2>
            <p className="muted">One admin can manage maximum 5 participants when backend assignment is enabled.</p>

            <div className="analytics-row">
              <div>Total: {analytics.total}</div>
              <div>Pending: {analytics.pending}</div>
              <div>Accepted: {analytics.accepted}</div>
              <div>Rejected: {analytics.rejected}</div>
            </div>

            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="all">All Papers</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <button className="yellow-btn" onClick={fetchPapers}>Refresh Papers</button>
            <button onClick={logout}>Logout</button>
          </div>

          {filteredPapers.map((paper) => (
            <div className="paper-card" key={paper.id}>
              <h3>{paper.title}</h3>
              <p><b>Author:</b> {paper.full_name}</p>
              <p><b>Email:</b> {paper.email}</p>
              <p><b>College:</b> {paper.college}</p>
              <p><b>Abstract:</b> {paper.abstract}</p>
              <p><b>Status:</b> {paper.status}</p>
              <p><b>Feedback:</b> {paper.admin_feedback || "No feedback"}</p>

              {paper.file_path && (
                <a href={`${API}/${paper.file_path}`} target="_blank" rel="noreferrer">
                  <button className="yellow-btn">View / Download PDF</button>
                </a>
              )}

              <div className="action-row">
                <button className="accept-btn" onClick={() => reviewPaper(paper.id, "accepted")}>Accept</button>
                <button className="reject-btn" onClick={() => reviewPaper(paper.id, "rejected")}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
