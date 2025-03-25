const mongoose = require("mongoose");

module.exports = async function () {
  try {
    await mongoose.connect(process.env.db);
    console.log(`Connected to mongodb...`);
  } catch (error) {
    console.log(error);
  }
};
