//initial config
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//read JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//first route
app.get("/", (req, res) => {
  res.json({ message: "Oi!" });
});

//deliver a port

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log("Banco conectado!");
  })
  .catch((err) => console.log(err));
app.listen(3001);
