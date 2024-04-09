import { Router } from "express";

import {
  getComments,
  getCommentsByvideoID,
  createComment,
  createReplyToComment
} from "../controllers/commentController";

const router = Router();

router.get("/", getComments);
router.get("/:videoID", getCommentsByvideoID);
router.post("/", createComment);
router.post("/reply", createReplyToComment);

export default router;