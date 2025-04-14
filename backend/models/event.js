const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  info: { type: String, required: true },
  dueAt: { type: Date, required: true },
  reoccurring: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    default: null,
  },
  timeRange: {
    startTime: { type: String, default: null }, // e.g military time 09:00
    endTime: { type: String,  default: null} // e.g military time 11:00
  },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: null },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;