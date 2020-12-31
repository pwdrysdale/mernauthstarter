const mongoose = require("mongoose");

const resetSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "1d",
  },
});

module.exports = mongoose.model("ResetRequest", resetSchema);
