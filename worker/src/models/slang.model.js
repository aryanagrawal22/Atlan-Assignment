const mongoose = require("mongoose");

const slangSchema = new mongoose.Schema(
  {
    taskId: {
        type: mongoose.SchemaTypes.ObjectId,
        index: true,
    },
    userId: Number,
    question: String,
    originalAnswer: String,
    translateAnswer: String,
    translateCity: String,
  },
  {
    timestamps: true,
  }
);

const SlangModel = mongoose.model("Slang", slangSchema);

module.exports = SlangModel;