import { Link } from "react-router-dom";

function ParticipantDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="app-bg">
      <div className="dashboard-card">
        <h2>Participant Dashboard</h2>
        <p><b>Name:</b> {user?.full_name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>College:</b> {user?.college}</p>

        <div className="dashboard-links">
          <Link to="/submit-paper"><button>Submit Research Paper</button></Link>
          <Link to="/my-papers"><button>View My Papers</button></Link>
          <Link to="/"><button className="yellow-btn">Logout</button></Link>
        </div>
      </div>
    </div>
  );
}

export default ParticipantDashboard;
