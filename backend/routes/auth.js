const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../db");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { full_name, email, phone, password, college } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const role = email.toLowerCase().endsWith("@scholar.com") ? "admin" : "participant";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (full_name, email, phone, password, role, college) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, phone, hashedPassword, role, college],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Email already exists or database error" });
        }
        res.json({ message: "Signup successful", role });
      }
    );
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Signin successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        college: user.college,
      },
    });
  });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "Email not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    db.query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [results[0].id, token, expiresAt],
      () => res.json({ message: "Password reset token generated", resetToken: token })
    );
  });
});

module.exports = router;
