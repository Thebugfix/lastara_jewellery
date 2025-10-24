const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone is required" });
  try {
    const n = new Newsletter({ phone });
    await n.save();
    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Already subscribed" });
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const list = await Newsletter.find().sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
