const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const animeSchema = new Schema({
  user: { type: String, required: true },
  title: { type: String, require: true },
  id: { type: String, require: true },
  description: { type: String, require: true },
  compositeKey: {
    type: {
      user: { type: String, required: true },
      id: { type: String, require: true },
    },
    required: true,
    unique: true,
  },
  genre: {
    type: [],
    require: false,
  },
  imgSrc: { type: String, require: true },
});

const Anime = mongoose.model("Anime", animeSchema);
module.exports = Anime;
