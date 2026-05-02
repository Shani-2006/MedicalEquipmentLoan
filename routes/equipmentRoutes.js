const express = require("express");
const router = express.Router();
const { checkEquipmentExists } = require("../middlewares/checkEquipmentExists");
const { authMiddleware } = require("../middlewares/authMiddleware");


const {
  getAllEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} = require("../controllers/equipmentController");


router.get("/", getAllEquipments);

router.post("/", createEquipment);

router.get("/:id", checkEquipmentExists, getEquipmentById);
router.put("/:id", checkEquipmentExists, updateEquipment);
router.delete("/:id", checkEquipmentExists, deleteEquipment);
module.exports = router;


