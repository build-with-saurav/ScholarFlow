import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      res.data.user.role === "admin" ? navigate("/admin") : navigate("/participant");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="app-bg">
      <div className="page-card">
        <h2>Sign In</h2>
        <p className="muted">Access your ScholarFlow dashboard</p>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button>Sign In</button>
        </form>
        <Link to="/forgot-password"><p className="link">Forgot Password?</p></Link>
        <Link to="/signup"><p className="link">New user? Create account</p></Link>
      </div>
    </div>
  );
}

export default Signin;
