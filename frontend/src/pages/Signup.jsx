import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    college: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      alert(res.data.message);
    } catch {
      alert("Signup failed. Email may already exist.");
    }
  };

  return (
    <div className="app-bg">
      <div className="page-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input name="full_name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <input name="college" placeholder="College / Organization" onChange={handleChange} />
          <button>Create Account</button>
        </form>
        <Link to="/signin"><p className="link">Already have an account? Sign In</p></Link>
      </div>
    </div>
  );
}

export default Signup;
