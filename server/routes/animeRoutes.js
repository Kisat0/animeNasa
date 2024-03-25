const express = require("express");
const router = express.Router();

import {
  getAnimes,
  getAnime,
  createAnime,
  updateAnime,
  deleteAnime,
  getAnimeCategories,
  getAnimeEpisodes,
  getCompletedAnimes,
  getLastestEpisodes,
  getReleasedAnimes,
  getTrendingAnimes,
} from "../controllers/animeController";


router.get("/", getAnimes);
router.get("/:id", getAnime);
router.post("/", createAnime);
router.put("/:id", updateAnime);
router.delete("/:id", deleteAnime);

router.get("/:id/categories", getAnimeCategories);
router.get("/:id/episodes", getAnimeEpisodes);
router.get("/trending", getTrendingAnimes);
router.get("/released", getReleasedAnimes);
router.get("/completed", getCompletedAnimes);
router.get("/:index/latest-episodes", getLastestEpisodes);

module.exports = router;