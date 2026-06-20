import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("Reset Token: " + res.data.resetToken);
    } catch {
      alert("Failed to generate reset token");
    }
  };

  return (
    <div className="app-bg">
      <div className="page-card">
        <h2>Forgot Password</h2>
        <p className="muted">Enter your registered email</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
          <button>Generate Reset Token</button>
        </form>
        <Link to="/signin"><p className="link">Back to Sign In</p></Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
