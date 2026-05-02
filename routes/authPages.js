const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send("Invalid credentials");
  }

  //  המשתמש ב-session
  req.session.user = {
    id: user._id,
    email: user.email
  };

  res.redirect("/equipments");
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
