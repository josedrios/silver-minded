const Event = require("../models/event");

exports.createEvent = async (req, res) => {
  try {
    const { info, reoccurring, dueAt, task } = req.body;
    const newEvent = new Event({ info, reoccurring, dueAt, task });
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
    const { info, reoccurring, dueAt, task } = req.body;
    const updated = await Event.findByIdAndUpdate(
      id,
      { info, reoccurring, dueAt, task },
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

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error occurred while deleting event",
      error: err.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);

    const events = await Event.find({
      $or: [
        {
          dueAt: { $gte: start, $lte: end }
        },
        {
          reoccurring: "yearly",
          $expr: { $eq: [{ $month: "$dueAt" }, month + 1] }
        },
        { reoccurring: 'monthly'}
      ]

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
