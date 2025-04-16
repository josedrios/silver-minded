const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  info: { type: String, required: true },
  dueAt: { type: Date, required: true },
  reoccurring: {
    type: String,
    enum: ["never", "monthly", "yearly"],
    default: null,
  },
  endAt: { type: Date, default: null},
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;