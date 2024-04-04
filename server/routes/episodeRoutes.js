import { Router } from "express";

import {
  getEpisodes,
  getEpisode,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodesByAnime,
  getLatestEpisodes,
  getNewsEpisodes
} from "../controllers/episodeController";

const router = Router();

router.get("/news", getNewsEpisodes);

router.get("/", getEpisodes);
router.get("/:id", getEpisode);
router.post("/", createEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

router.get("/anime/:animeId", getEpisodesByAnime);
router.get("/latest/:index", getLatestEpisodes);

export default router;