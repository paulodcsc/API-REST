const mongoose = require("mongoose");

const Item = mongoose.model("Item", {
  name: String,
  price: Number,
  category: String,
  description: String,
  happyHour: Boolean,
  happyHourPrice: Number,
});

module.exports = Item;
