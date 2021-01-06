const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
});

module.exports = mongoose.model("Items", ItemSchema);
