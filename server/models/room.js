import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
    episode: {
        type: Schema.Types.ObjectId,
        ref: "episode",
        required: true,
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: "anime",
        required: true,
    }
});
    
module.exports = mongoose.model("room", roomSchema);