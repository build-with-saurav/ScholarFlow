const express = require("express");
const multer = require("multer");
const db = require("../db");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/submit", verifyToken, upload.single("paper"), (req, res) => {
  const { title, abstract, keywords, domain } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  const sql = `
    INSERT INTO papers (user_id, title, abstract, keywords, domain, file_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.user.id, title, abstract, keywords, domain, req.file.path],
    (err) => {
      if (err) return res.status(500).json({ message: "Paper submission failed" });
      res.json({ message: "Paper submitted successfully" });
    }
  );
});

router.get("/my-papers", verifyToken, (req, res) => {
  db.query("SELECT * FROM papers WHERE user_id = ?", [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

router.get("/all", verifyToken, isAdmin, (req, res) => {
  db.query(
    `SELECT papers.*, users.full_name, users.email, users.college
     FROM papers JOIN users ON papers.user_id = users.id
     ORDER BY papers.submitted_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      res.json(results);
    }
  );
});

router.put("/review/:id", verifyToken, isAdmin, (req, res) => {
  const { status, admin_feedback } = req.body;

  db.query(
    "UPDATE papers SET status = ?, admin_feedback = ? WHERE id = ?",
    [status, admin_feedback, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: "Review update failed" });
      res.json({ message: "Paper review updated" });
    }
  );
});

module.exports = router;
