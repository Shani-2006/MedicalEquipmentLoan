const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    totalQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
  type: String,
  required: false,
  default: ""
},

    isActive: {
      type: Boolean,
      default: true
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
