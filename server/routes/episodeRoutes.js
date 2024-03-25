const express = require("express");
const router = express.Router();

import {
    getEpisodes,
    getEpisode,
    createEpisode,
    updateEpisode,
    deleteEpisode,
    getEpisodesByAnime
} from "../controllers/episodeController";
    
router.get("/", getEpisodes);
router.get("/:id", getEpisode);
router.post("/", createEpisode);
router.put("/:id", updateEpisode);
router.delete("/:id", deleteEpisode);

router.get("/anime/:animeId", getEpisodesByAnime);

module.exports = router;