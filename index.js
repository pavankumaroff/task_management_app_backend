const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();
require("./config/db")();

const app = express();
app.use(cors());

const tasks = require("./routes/tasks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);
app.use("/api/users", users);
app.use(error);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
