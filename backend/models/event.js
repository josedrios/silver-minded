const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  info: { type: String },
  date: { type: Date, default: null },

  time: {
    type: {
      hour: String,
      minute: String,
      period: { type: String, enum: ['AM', 'PM'] },
    },
    default: null,
  },
  reoccurring: {
    type: {
      frequency: { type: String, enum: ['week', 'month', 'year'] },
      frame: { type: String, enum: ['allday', 'instance'] },
      days: [String],
      start: { type: Date, default: null },
      end: { type: Date, default: null },
    },
    default: null,
  },

  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;