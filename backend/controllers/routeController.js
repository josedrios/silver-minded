const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { name, info, tag, status, dueAt } = req.body;
    const newTask = new Task({ name, info, tag, status, dueAt });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while creating new task",
      error: err.message,
    });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, info, tag, dueAt } = req.body;
    const updated = await Task.findByIdAndUpdate(
      id,
      { name, info, tag, dueAt },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while editing task",
      error: err.message,
    });
  }
};

exports.statusUpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while updating status of task",
      error: err.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting tasks",
      error: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting task",
      error: err.message,
    });
  }
};

exports.deleteDoneTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({ status: 'done' });
    res.json({ message: `${result.deletedCount} tasks deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting done tasks",
      error: err.message,
    });
  }
};

