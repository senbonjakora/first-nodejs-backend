const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id).select({ name: 1 });

  if (!genre)
    return res.status(404).send("The Genre with the given ID not abailable!");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await new Genre({ name: req.body.name }).save();

  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The Genre with the given ID not abailable!");

  const { error } = validation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send("Invalid genre ID!");

  res.send(genre);
});

function validation(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(250).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
