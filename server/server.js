require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const mongoString = process.env.DATABASE_URL;

import userRoutes from "./routes/userRoutes";
import animeRoutes from "./routes/animeRoutes";
import episodeRoutes from "./routes/episodeRoutes";
import messageRoutes from "./routes/messageRoutes";

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/animes", animeRoutes);
app.use("/episodes", episodeRoutes);
app.use("/messages", messageRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
