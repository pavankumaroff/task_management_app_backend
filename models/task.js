const Joi = require("joi");
const mongoose = require("mongoose");

const taskschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      minlength: 2,
      maxlength: 255,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("task", taskschema);

const validatetask = (task) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    title: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(5).max(1024).required(),
    status: Joi.string().valid("Completed", "Pending"),
  });

  return schema.validate(task);
};

module.exports.Task = Task;
module.exports.validate = validatetask;
