const express = require("express");
const mongoose = require("mongoose");
const app = express(); // Init Express
const bodyParser = require("body-parser");
const Item = require("./models/Item");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;
const DATABASE = process.env.DB_CONNECTION;

app.post("/", async (req, res) => {
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
  });

  item
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.get("/", async (req, res) => {
  res.send("Main Page");
});

app.get("/user_items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.json({ message: error });
  }
});

mongoose.connect(
  DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("Connect to MongoDB...")
);

app.listen(PORT, () => {
  console.log(`App listening at PORT ${PORT}`); // Listening on Port
});
