import { Router } from "express";

import {
  getComments,
  getCommentsByvideoID,
  createComment,
} from "../controllers/commentController";

const router = Router();

router.get("/", getComments);
router.get("/:videoID", getCommentsByvideoID);
router.post("/", createComment);

export default router;