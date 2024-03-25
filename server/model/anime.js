const mongoose = require("mongoose");
const { Schema } = mongoose;

const episodeSchema = require("./episode");

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
    isInTreding: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("anime", animeSchema);