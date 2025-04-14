const Event = require('../models/event')

exports.createEvent = async (req,res) => {
    try {
        const { info, reoccurring, timeRange } = req.body;
        const newEvent = new Event({ info, reoccurring, timeRange });
        await newEvent.save();
        return res.status(201).json(newEvent);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error occurred while creating new event",
          error: err.message,
        });
      }
}

exports.editEvent = async (req,res) => {

}

exports.deleteEvent = async (req,res) => {
    
}

exports.getEvents = async (req,res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.json(events);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error occurred while getting events",
          error: err.message,
        });
      }
}