const mongoose = require("mongoose");
const { Genre, GenreSchema } = require("../models/genre");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: String,
    numberInStock: Number,
    dailyRentalRate: Number,
    genres: {
      type: GenreSchema,
      require: true,
    },
  })
);

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2 },
    ],
  },
];

async function seed() {
  for (const movie of data) {
    const { _id: genreId } = await new Genre({
      _id: movie._id,
      name: movie.name,
    }).save();

    const movies = movie.movies.map((m) => ({
      ...m,
      genres: { _id: genreId, name: movie.name },
    }));

    await Movie.insertMany(movies);
  }
}

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(255).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
    genreId: Joi.objectId().required(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
