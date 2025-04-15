const express = require("express");
const {
    getEvents,
    createEvent,
    editEvent,
    deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.get("/:year/:month", getEvents);
router.post("/", createEvent);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);

module.exports = router;