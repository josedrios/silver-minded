const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  info: { type: String },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
