import mongoose from "mongoose";
const { Schema } = mongoose;

const episodeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    default: "No description available.",
  },
  number: {
    type: Number,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  anime: {
    type: Schema.Types.ObjectId,
    ref: "anime",
    required: true,
  },
});

module.exports = mongoose.model("episode", episodeSchema);
