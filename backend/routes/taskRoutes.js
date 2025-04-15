const express = require("express");
const {
  createTask,
  editTask,
  getTasks,
  deleteTask,
  statusUpdateTask,
  deleteDoneTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/status/:id", statusUpdateTask);
router.delete("/done", deleteDoneTasks);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
