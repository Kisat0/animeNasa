import { Router } from "express";

import {
  getEpisodes,
  getEpisode,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getEpisodesByAnime,
  getLatestEpisodes,
  getNewsEpisodes,
  getNumberSeasons,
  getEpisodesBySeason
} from "../controllers/episodeController";

const router = Router();

router.get("/latest/:index", getLatestEpisodes);
router.get("/news", getNewsEpisodes);
router.get("/numberSeasons/:animeId", getNumberSeasons);
router.get("/:animeId/:season",getEpisodesBySeason);


router.get("/", getEpisodes);
router.get("/:id", getEpisode);
router.post("/", createEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

router.get("/anime/:animeId", getEpisodesByAnime);


export default router;