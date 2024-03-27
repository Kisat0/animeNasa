import { Router } from "express";

import {
  getEpisodes,
  getEpisode,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodesByAnime,
  getLatestEpisodes,
} from "../controllers/episodeController";

const router = Router();
    
router.get("/", getEpisodes);
router.get("/:id", getEpisode);
router.post("/", createEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

router.get("/anime/:animeId", getEpisodesByAnime);
router.get("/latest/:index", getLatestEpisodes);

export default router;