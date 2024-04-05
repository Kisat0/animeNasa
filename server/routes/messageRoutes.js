import { Router } from "express";

const router = Router();

router.post("/", createMessage);

import {
    createMessage
  } from "../controllers/messageController";