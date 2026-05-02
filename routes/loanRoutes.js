const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { createLoan, getMyLoans,returnLoan  } = require("../controllers/loanController");


router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Loans route works ✅" });
});
router.get("/my", authMiddleware, getMyLoans);



router.post("/", authMiddleware, createLoan);
router.put("/:id/return", authMiddleware, returnLoan);
module.exports = router;



