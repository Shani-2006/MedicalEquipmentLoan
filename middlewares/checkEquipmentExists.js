const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");

async function checkEquipmentExists(req, res, next) {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid equipment ID format" });
  }

  try {
    const equipment = await Equipment.findById(id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    req.equipment = equipment;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkEquipmentExists };

