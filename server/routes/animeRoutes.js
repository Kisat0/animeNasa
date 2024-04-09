import { Router } from "express";

const router = Router();

import {
  getAnimes,
  getAnime,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeCategories,
  getAnimeEpisodes,
  getCompletedAnimes,
  getReleasedAnimes,
  getTrendingAnimes,
  getAnimeFilterSeason
} from "../controllers/animeController";


router.get("/", getAnimes);
router.get("/:id", getAnime);
router.post("/", createAnime);
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

router.get("/filter/:id/:season",getAnimeFilterSeason);
router.get("/:id/categories", getAnimeCategories);
router.get("/:id/episodes", getAnimeEpisodes);
router.get("/trending", getTrendingAnimes);
router.get("/released", getReleasedAnimes);
router.get("/completed", getCompletedAnimes);

export default router;