const router = require("express").Router();
import { Request, Response } from 'express'
import Item from "../models/Item";

router.post("/", async (req: Request, res: Response) => {
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
    res.status(201).send("Item inserido no sistema!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const item = await Item.find();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id; //extraindo parametro da url
  try {
    const item = await Item.findOne({ _id: id }); //o id da aplicação tem que ser igual o _id do DB

    if (!item) {
      res.status(422).send("Item não encontrado!")
      return
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  const { name, price, category, description, happyHour, happyHourPrice } = req.body;

  const item = {
    name,
    price,
    category,
    description,
    happyHour,
    happyHourPrice,
  };

  try {
    const updatedItem = await Item.updateOne({ _id: id }, item)

    if (updatedItem.matchedCount === 0) {
      res.status(422).send("Item não encontrado!")
      return
    }

    res.status(200).json(item)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id })

  if (!item) {
    res.status(422).send("Item não encontrado!")
    return
  }
  try {
    await Item.deleteOne({ _id: id })
    res.status(200).send("Item removido!")
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router;
