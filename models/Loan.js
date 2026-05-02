const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    returned: {
      type: Boolean,
      default: false
    },
    loanDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
