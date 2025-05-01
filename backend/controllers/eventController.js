const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { event } = req.body;
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
    const start = (req.params.start);
    const end = (req.params.end);

    console.log(start, end);

    const events = await Event.find({
      $or: [
        // Events with a specific 'date' that falls within start and end
        {
          date: {
            $gte: start, // Events with a date greater than or equal to 'start'
            $lte: end, // Events with a date less than or equal to 'end'
          },
        },
        // Recurring yearly events that are in the given range
        {
          'reoccurring.frequency': 'yearly',
          'reoccurring.start': {
            $lte: end, // The recurring event's start should be less than or equal to 'end'
          },
          'reoccurring.end': {
            $gte: start, // The recurring event's end should be greater than or equal to 'start'
          },
        },
        // Recurring monthly events that are in the given range
        {
          'reoccurring.frequency': 'monthly',
          'reoccurring.start': {
            $lte: end,
          },
          'reoccurring.end': {
            $gte: start,
          },
        },
      ],
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
