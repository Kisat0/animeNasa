import { Router } from "express";

import {
  getComments,
  getCommentsByvideoID,
  getRepliesByCommentID,
  createComment,
  createReplyToComment,
  toggleLike,
  toggleDislike
} from "../controllers/commentController";

const router = Router();

router.get("/", getComments);
router.get("/:videoID", getCommentsByvideoID);
router.get("/reply/:commentID", getRepliesByCommentID);
router.post("/", createComment);
router.post("/reply", createReplyToComment);
router.post("/like", toggleLike);
router.post("/dislike", toggleDislike);

export default router;