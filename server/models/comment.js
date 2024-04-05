import mongoose from "mongoose";
const { Schema } = require("mongoose");

const commentSchema = new Schema({
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
  dislike: {
    type: Number,
    default: 0,
  },
  reply_to: {
    type: String,
  },
  reply: {
    type: Schema.Types.ObjectId,
    ref: "comment",
  },
});

module.exports = mongoose.model("comment", commentSchema)