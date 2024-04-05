require("dotenv").config();
import express from "express";
import session from 'express-session-jwt';
import mongoose from "mongoose";
import cors from "cors";
const mongoString = process.env.DATABASE_URL;

import userRoutes from "./routes/userRoutes";
import animeRoutes from "./routes/animeRoutes";
import episodeRoutes from "./routes/episodeRoutes";
import commentRoutes from "./routes/commentRoutes";

import { secretKey } from "./controllers/userController";

mongoose.connect(mongoString);

const database = mongoose.connection;

const app = express();

database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());

// Configurer le middleware express-session-jwt dans un middleware
app.use((req, res, next) => {
  const sessionOptions = {
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    jwtFromReq: req => req.cookies.session,
  };

  req.session = session(sessionOptions);
  next();
});

const ensureSession = (req, res, next) => {
  if (!req.session) {
    return res.status(500).send('Session not initialized');
  }
  next();
};

app.use('/users', ensureSession, userRoutes);
app.use("/animes", animeRoutes);
app.use("/episodes", episodeRoutes);
app.use("/comment", commentRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});