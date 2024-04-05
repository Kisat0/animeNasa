import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({ 
    title: {
        type: String,
        required: true,
      },
      corps: {
        type: String,
        required: true,
      },
})