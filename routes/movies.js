const _ = require("lodash");
const { Movie, validate } = require("../models/movie");
const express = require("express");
const mongoose = require("mongoose");
const { Genre } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().select(
    "title numberInStock genres.name -_id"
  );
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await new Movie(
    // _.pick(req.body, ["title", "numberInStock", "dailyRentalRate", "genreId"])
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genres: { _id: genre._id, name: genre.name },
    }
  ).save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The course with the given ID not abailable!");

  movie.set(
    _.pick(req.body, ["title", "numberInStock", "dailyRentalRate", "genreId"])
  );

  await movie.save();

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie)
    return res.status(404).send("The course with the given ID not abailable!");

  res.send(movie);
});

module.exports = router;
