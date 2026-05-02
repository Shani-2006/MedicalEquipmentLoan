const express = require("express");
const router = express.Router();

const Equipment = require("../models/Equipment");
const Loan = require("../models/Loan");

const axios = require("axios");
const { sessionAuth } = require("../middlewares/sessionAuth");

router.get("/", (req, res) => {
  res.render("index");
});



router.get("/equipments", sessionAuth, async (req, res, next) => {
  const equipments = await Equipment.find();
  res.render("equipments", { equipments });
});


router.get("/add-equipment", sessionAuth, async (req, res, next) => {
  try {
    const equipments = await Equipment.find();
    res.render("addEquipment", { equipments });
  } catch (err) {
    next(err);
  }
});


router.post("/equipments/add", sessionAuth, async (req, res, next) => {
  try {
    const { equipmentId, quantity } = req.body;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).send("Equipment not found");
    }

    const qty = Number(quantity);
    equipment.totalQuantity += qty;
    equipment.availableQuantity += qty;

    await equipment.save();
    res.redirect("/equipments");
  } catch (err) {
    next(err);
  }
});



router.post("/borrow", sessionAuth, async (req, res, next) => {
  try {
    const { equipmentId, quantity } = req.body;

    await axios.post(
      "http://localhost:5000/api/loans",
      { equipmentId, quantity: Number(quantity) },
      {
        headers: {
          Authorization: `Bearer ${req.session.token}`
        }
      }
    );

    res.redirect("/equipments");
  } catch (err) {
    console.log("BORROW ERROR:", err.response?.data || err.message);
    res.status(err.response?.status || 500).send(err.response?.data || "Borrow failed");
  }
});



router.get("/login", (req, res) => {
  res.render("login");
});


router.get("/register", (req, res) => {
  res.render("register");
});


router.post("/register", async (req, res, next) => {
  try {
    await axios.post("http://localhost:5000/api/auth/register", req.body);
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      req.body
    );

    req.session.token = response.data.token;
    res.status(200).json({ success: true });
  } catch (err) {
    if (err.response && err.response.status === 401) {
    res.status(200).json({ success: true });
    }
    next(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


router.get("/my-loans", sessionAuth, async (req, res, next) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/loans/my",
      {
        headers: {
          Authorization: `Bearer ${req.session.token}`
        }
      }
    );

    res.render("myLoans", { loans: response.data });
  } catch (err) {
    next(err);
  }
});


router.post("/return-loan", sessionAuth, async (req, res, next) => {
  try {
    const { loanId } = req.body;

    await axios.put(
      `http://localhost:5000/api/loans/${loanId}/return`,
      {},
      {
        headers: {
          Authorization: `Bearer ${req.session.token}`
        }
      }
    );

    res.redirect("/my-loans");
  } catch (err) {
    console.log("RETURN ERROR:", err.response?.data || err.message);
    res.status(500).send("Return failed");
  }
});

module.exports = router;
