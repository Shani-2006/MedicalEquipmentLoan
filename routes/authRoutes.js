const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});


const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
module.exports = router;
