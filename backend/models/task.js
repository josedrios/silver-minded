const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  info: { type: String },
  tag: {
    type: String,
    enum: ["dev", "misc"],
    default: "misc",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  dueAt: { type: Date },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
