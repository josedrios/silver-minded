const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
  tag: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "active", "done"],
    default: "pending",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  dueAt: {type: Date}
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
