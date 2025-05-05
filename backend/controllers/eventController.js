const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { event } = req.body;
    console.log('TESTING:')
    console.log(event);

    const newEvent = new Event({
      info: event.info,
      date: event.date,
      time: event.time,
      reoccurring: event.reoccurring,
    });
    console.log(newEvent);
    await newEvent.save();
    return res.status(201).json(newEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while creating new event',
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
      message: 'Error occurred while editing task',
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
      message: 'Error occurred while deleting event',
      error: err.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { start, end} = req.params;

    console.log(start, end);

    const events = await Event.find({
      date: {
        $gte: start,
        $lte: end,
      },
    }).sort({ date: 1 });

    console.log(events);

    res.json(events);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while getting events',
      error: err.message,
    });
  }
};
