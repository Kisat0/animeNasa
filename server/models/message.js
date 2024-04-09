import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({ 
    title: {
        type: String,
        required: true,
      },
      corps: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("message", messageSchema);