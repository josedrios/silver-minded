const Task = require("../models/task");
const Event = require("../models/event");

exports.createTask = async (req, res) => {
  try {
    const { info } = req.body;
    const newTask = new Task({ info});
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
    const { info, status} = req.body;

    const updateData = {};
    if (info !== undefined) updateData.info = info;
    if (status !== undefined) updateData.status = status;

    const updated = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while editing task",
      error: err.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    await Event.updateMany({ task: deleted._id }, { $set: { task: null } });
    res.json({ message: "Task deleted" });
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
    const doneTasks = await Task.find({ status: "done" });
    const doneTaskIds = doneTasks.map(task => task._id);

    const result = await Task.deleteMany({ _id: { $in: doneTaskIds } });
    await Event.updateMany({ task: { $in: doneTaskIds } }, { $set: { task: null } });
    res.json({ message: `${result.deletedCount} tasks deleted` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting done tasks",
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

