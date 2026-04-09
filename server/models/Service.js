const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  user: String
});

module.exports = mongoose.model("Service", serviceSchema);