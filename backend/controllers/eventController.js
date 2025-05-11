const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { event } = req.body;

    const newEvent = new Event({
      info: event.info,
      date: event.date,
      time: event.time,
      reoccurring: event.reoccurring,
    });
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
    const { event } = req.body;

    const updated = await Event.findByIdAndUpdate(
      id,
      {
        info: event.info,
        date: event.date,
        time: event.time,
        reoccurring: event.reoccurring,
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Error occurred while editing event',
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
    const { start, end } = req.params;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentMonth = startDate.getUTCMonth() + 1;

    console.log(startDate, endDate, currentMonth);

    const events = await Event.find({
      $or: [
        {
          $and: [
            { date: { $gte: startDate, $lte: endDate } },
            { 'reoccurring.frequency': null },
          ],
        },
        {
          $and: [
            { 'reoccurring.frequency': { $in: ['month', 'week'] } },
            {
              $or: [
                { 'reoccurring.start': { $lt: endDate } },
                { 'reoccurring.start': null },
              ],
            },
            {
              $or: [
                { 'reoccurring.end': { $gt: startDate } },
                { 'reoccurring.end': null },
              ],
            },
          ],
        },
        {
          $and: [
            { 'reoccurring.frequency': 'year' },
            {
              $expr: {
                $eq: [{ $month: '$date' }, currentMonth],
              },
            },
            {
              $or: [
                { 'reoccurring.start': { $lt: endDate } },
                { 'reoccurring.start': null },
              ],
            },
            {
              $or: [
                { 'reoccurring.end': { $gt: startDate } },
                { 'reoccurring.end': null },
              ],
            },
          ],
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
