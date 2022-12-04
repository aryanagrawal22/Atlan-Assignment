const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {type: Number, index: true,},
    taskType: String,
    status: {
      type: String,
      default: "Pending",
    },
    comments: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;