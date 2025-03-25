const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Task, validate } = require("../models/task");
const validator = require("../middleware/validator");
const auth = require("../middleware/auth");
const validateId = require("../middleware/idValidator");

router.get("/:id", [validateId, auth], async (req, res) => {
  if (req.user._id !== req.params.id)
    return res.status(403).send("Access denied");

  let tasks = await Task.find({ userId: req.params.id }).select("-__v");

  if (tasks.length === 0) return res.status(404).send("tasks not found");

  res.send(tasks);
});

router.post("/", [validator(validate), auth], async (req, res) => {
  if (req.user._id !== req.body.userId)
    return res.status(404).send("Invalid user");

  const task = await Task.create({
    title: req.body.title,
    userId: req.body.userId,
    description: req.body.description,
  });

  res.send(_.pick(task, ["_id", "userId", "title", "completed"]));
});

router.put(
  "/:id",
  [validateId, validator(validate), auth],
  async (req, res) => {
    if (req.user._id !== req.body.userId)
      return res.status(404).send("Invalid user");

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.body.userId,
    }).select("-__v");

    if (!task) return res.status(404).send("task not found");

    task.title = req.body.title;
    task.description = req.body.description;
    if (req.body.status == "Completed") task.status = req.body.status;

    await task.save();

    res.send(task);
  }
);

router.delete("/:id", [validateId, auth], async (req, res) => {
  const task = await Task.findById(req.params.id).select("-__v");

  if (!task) return res.status(404).send("task not found");

  if (req.user._id !== task.userId.toString())
    return res.status(403).send("Access denied");

  await task.remove();

  res.send(task);
});

module.exports = router;
