const router = require("express").Router();
const { restart } = require("nodemon");
const Item = require("../models/Item");

router.post("/", async (req, res) => {
  const { name, price, category, description, happyHour, happyHourPrice } =
    req.body;

  const item = {
    name,
    price,
    category,
    description,
    happyHour,
    happyHourPrice,
  };

  try {
    await Item.create(item);
    res.status(201).json({ message: "Item inserido no sistema!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const item = await Item.find();

    res.status(200).json(item);
  } catch (error) {
    res.statis(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id; //extraindo parametro da url
  try {
    const item = await Item.findOne({ _id: id }); //o id da aplicação tem que ser igual o _id do DB
  } catch {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
