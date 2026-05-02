const Equipment = require("../models/Equipment");


async function getAllEquipments(req, res, next) {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (err) {
    next(err);
  }
}


async function getEquipmentById(req, res, next) {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }
    res.json(equipment);
  } catch (err) {
    next(err);
  }
}

async function createEquipment(req, res, next) {
  try {
    const {
      name,
      category,
      description,
      totalQuantity = 1,
      availableQuantity = 1,
      image
    } = req.body;

    const existingEquipment = await Equipment.findOne({ name, category });

    if (existingEquipment) {
      existingEquipment.totalQuantity += totalQuantity;
      existingEquipment.availableQuantity += availableQuantity;

      await existingEquipment.save();

      return res.status(200).json({
        message: "Equipment quantity updated",
        equipment: existingEquipment
      });
    }

   
    const newEquipment = await Equipment.create({
      name,
      category,
      description,
      totalQuantity,
      availableQuantity,
      image
    });

    res.status(201).json(newEquipment);

  } catch (err) {
    next(err);
  }
}



async function updateEquipment(req, res, next) {
  try {
    const updated = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteEquipment(req, res, next) {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
};
