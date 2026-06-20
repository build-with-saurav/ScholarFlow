import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={theme === "dark" ? "site dark" : "site light"}>
      <nav className="top-nav">
        <button onClick={() => document.getElementById("home").scrollIntoView({behavior:"smooth"})}>Home</button>
        <button onClick={() => document.getElementById("signin").scrollIntoView({behavior:"smooth"})}>Sign In</button>
        <button onClick={() => document.getElementById("about").scrollIntoView({behavior:"smooth"})}>About</button>
        <button onClick={() => document.getElementById("features").scrollIntoView({behavior:"smooth"})}>Features</button>
        <button onClick={() => document.getElementById("workflow").scrollIntoView({behavior:"smooth"})}>Workflow</button>
        <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>

      <section id="home" className="section hero">
        <p className="tag">Academic Research Portal</p>
        <h1>ScholarFlow</h1>
        <p className="hero-text">
          A full-stack research paper submission and review system for participants and administrators.
        </p>
      </section>

      <section id="signin" className="section compact">
        <div className="auth-box">
          <h2>ScholarFlow</h2>
          <p>Sign in to continue</p>
          <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button className="yellow-btn">New User? Sign Up</button></Link>
          <Link to="/forgot-password"><span>Forgot Password?</span></Link>
        </div>
      </section>

      <section id="about" className="section content">
        <h2>About ScholarFlow</h2>
        <p>
          ScholarFlow is a research paper submission and review portal where participants can create an account,
          submit research paper details, upload PDF files, and track review status. The platform stores all user,
          paper, and review data inside a MySQL database.
        </p>
      </section>

      <section id="features" className="section content">
        <h2>Key Features</h2>
        <p>
          The system includes signup, signin, forgot password, role-based login, paper upload, status tracking,
          admin review, accept/reject decisions, and feedback management. Emails ending with @scholar.com are
          treated as admin accounts. Other emails are treated as participant accounts.
        </p>
      </section>

      <section id="workflow" className="section content">
        <h2>How It Works</h2>
        <p>
          A participant signs up, logs in, and submits a research paper with title, abstract, keywords, domain,
          and PDF. The admin logs in, views all submissions, reviews them, and updates the status as accepted
          or rejected with feedback.
        </p>
      </section>
    </div>
  );
}

export default Home;
