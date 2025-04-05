const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String },
  tag: {
    type: String,
    enum: ["dev", "root", "misc", ""],
    default: "misc",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "active", "done"],
    default: "pending",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  dueAt: { type: Date },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
