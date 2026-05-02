const Loan = require("../models/Loan");
const Equipment = require("../models/Equipment");

async function createLoan(req, res, next) {
  try {
    const { equipmentId, quantity } = req.body;
    const userId = req.user.userId;

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.availableQuantity < quantity) {
      return res.status(400).json({ message: "Not enough equipment available" });
    }

 
    const loan = await Loan.create({
      user: userId,
      equipment: equipmentId,
      quantity
    });

    equipment.availableQuantity -= quantity;
    await equipment.save();

    res.status(201).json(loan);

  } catch (err) {
    next(err);
  }
}
async function getMyLoans(req, res, next) {
  try {
    const userId = req.user.userId;
    const loans = await Loan.find({ user: userId })
      .populate("equipment");

    res.json(loans);
  } catch (err) {
    next(err);
  }
}

async function returnLoan(req, res, next) {
  try {
    const loanId = req.params.id;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.returned) {
      return res.status(400).json({ message: "Loan already returned" });
    }

    // 🔹 כאן הקוד ששאלת עליו
    loan.returned = true;
    loan.returnDate = new Date();

    const equipment = await Equipment.findById(loan.equipment);
    equipment.availableQuantity += loan.quantity;

    await loan.save();
    await equipment.save();

    res.json({ message: "Loan returned successfully" });
  } catch (err) {
    next(err);
  }
}



module.exports = { createLoan, getMyLoans,returnLoan };
