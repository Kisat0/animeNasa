import mongoose from "mongoose";
const { Schema } = mongoose;

const episodeSchema = require("./episode").schema;

const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["ongoing", "completed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  categories: {
    type: [String],
    required: true,
  },
  episodes: {
    type: [episodeSchema],
    required: false,
    default: [],
  },
  isInTrending: {
    type: Boolean,
    default: false,
  },
  poster: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  lang_available: {
    type: [String],
    required: false,
    default: [],
  },
  // temporary fix for the frontend because of the cors issue
  color: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("anime", animeSchema);
