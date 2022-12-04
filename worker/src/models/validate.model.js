const mongoose = require("mongoose");

const validSchema = new mongoose.Schema(
  {
    taskId: {
        type: mongoose.SchemaTypes.ObjectId,
        index: true,
    },
    userId: Number,
    valid: Boolean,
  },
  {
    timestamps: true,
  }
);

const ValidModel = mongoose.model("Valid", validSchema);

module.exports = ValidModel;