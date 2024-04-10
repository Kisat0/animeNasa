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
  getAnimeFilterSeason,
  getAnimeTrends,
  updateViews,
  getNewsSeasons
} from "../controllers/animeController";

router.get("/newsSeasons",getNewsSeasons)
router.get("/trends",getAnimeTrends);
router.put("/views/:id",updateViews )
router.put("/:id", updateAnime);
router.get("/", getAnimes);
router.get("/:id", getAnime);
router.post("/", createAnime);

router.delete("/:id", deleteAnime);


router.get("/filter/:id/:season",getAnimeFilterSeason);
router.get("/:id/categories", getAnimeCategories);
router.get("/:id/episodes", getAnimeEpisodes);
router.get("/trending", getTrendingAnimes);
router.get("/released", getReleasedAnimes);
router.get("/completed", getCompletedAnimes);

export default router;