const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

exports.Genre = Genre;
exports.GenreSchema = genreSchema;
