const express = require("express");
const {
  createTask,
  editTask,
  getTasks,
  deleteTask,
  deleteDoneTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/done", deleteDoneTasks);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
