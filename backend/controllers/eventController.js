const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    const { info, reoccurring, dueAt } = req.body;
    const newEvent = new Event({ info, reoccurring, dueAt });
    await newEvent.save();
    return res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while creating new event",
      error: err.message,
    });
  }
};

exports.editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { info, reoccurring, dueAt } = req.body;
    const updated = await Event.findByIdAndUpdate(
      id,
      { info, reoccurring, dueAt },
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

exports.deleteEvent = async (req, res) => {};

exports.getEvents = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    console.log(year, month);

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);

    const events = await Event.find({
      dueAt: { $gte: start, $lt: end },
    }).sort({ dueAt: 1 });
    res.json(events);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while getting events",
      error: err.message,
    });
  }
};
