module.exports = function error(err, req, res, next) {
  console.log(err);

  res.status(500).send("Internal Server Error.");
};
