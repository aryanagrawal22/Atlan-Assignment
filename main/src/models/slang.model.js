const mongoose = require("mongoose");

const slangSchema = new mongoose.Schema(
  {
    taskId: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    userId: Number,
    original: String,
    translate: String,
  },
  {
    timestamps: true,
  }
);

const SlangModel = mongoose.model("Slang", slangSchema);

module.exports = SlangModel;