const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const validator = require("../middleware/validator");
const auth = require("../middleware/auth");

router.get("/me", [auth], async (req, res) => {
  const user = await User.findById(req.user._id).select("-__v -password");

  res.send(user);
});

router.post("/", [validator(validate)], async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User is already exist");

  user = new User(_.pick(req.body, ["email", "name", "password"]));
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "email", "name"]));
});

module.exports = router;
