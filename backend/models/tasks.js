const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: { type: String, required: true },
  tag: { type: String, required: true },
  status: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;