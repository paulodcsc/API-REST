const mongoose = require("mongoose");

const Item = mongoose.model("Item", {
  title: String,
  description: String,
  price: Number,
  category: String,
  tags: String,
  serving_size: Number,
});

export default Item;
