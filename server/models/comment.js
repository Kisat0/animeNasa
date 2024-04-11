import mongoose from "mongoose";
const { Schema } = require("mongoose");
const commentSchema = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true },
  videoID: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  users_like: {
    type: [String],
    default: [],
  },
  dislike: {
    type: Number,
    default: 0,
  },
  users_dislike: {
    type: [String],
    default: [],
  },
  reply_to: {
    type: String,
  },
  reply: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    default: [],
  },
  avatar: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("comment", commentSchema)