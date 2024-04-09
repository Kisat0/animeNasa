require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const mongoString = process.env.DATABASE_URL;

import userRoutes from "./routes/userRoutes";
import animeRoutes from "./routes/animeRoutes";
import episodeRoutes from "./routes/episodeRoutes";

const WebSocket = require("websocket").server;

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

const server = app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

const wsServer = new WebSocket({
  httpServer: server,
});

const { ws, handleUserJoin, onClose } = require("./controllers/roomController");

const Rooms = new Map();
const Data = {};

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  console.log("Connection established");

  connection.on("message", (message) => {
    const { episode, type } = JSON.parse(message.utf8Data);

    if (type === "join") handleUserJoin(episode, connection, Rooms, Data);
    else ws(episode, message.utf8Data, Rooms, Data);

    console.log(episode);
  });

  connection.on("close", () => {
    onClose(connection, Rooms);
    console.log("Connection closed");
  });

  connection.on("error", (error) => {
    console.log(error);
  });
});
