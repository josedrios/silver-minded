const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  info: { type: String },
  date: { type: Date, default: null },

  time: {
    // turn this to a subdocument
    type: {
      hour: Number,
      minute: Number,
    },
    // add id false
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
    // turn this to a subdocument
    // add id false
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;