const Task = require("../models/tasks");

exports.createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { name, info, tag } = req.body;

    const newTask = new Task({
      name,
      info,
      tag,
    });

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
    const { name, info, tag } = req.body;
    const { id } = req.params;

    const existingTask = await Task.findById(id);
    if (!existingTask)
      return res.status(404).json({ message: "Task not found" });

    const task = await Task.findByIdAndUpdate(
      id,
      {
        name: name?.trim() === "" ? existingTask.name : name,
        info: info?.trim() === "" ? existingTask.info : info,
        tag: tag?.trim() === "" ? existingTask.tag : tag,
      },
      {
        new: true,
      }
    );

    return res.status(201).json(task);
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
    const { status } = req.body;
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    return res.status(201).json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while editing task",
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
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
    return;
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
    const doneTasks = await Task.deleteMany({ status: "done" });

    if (!doneTasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    res.json({ message: "Tasks deleted" });
    return;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting done tasks",
      error: err.message,
    });
  }
};
