const Anime = require('../models/anime');

const getAnimes = async (req, res) => {
    try {
        const animes = await Anime.find();
        res.json(animes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getAnime = async (req, res) => {
    const { id } = req.params;
    const anime = await Anime.findById(id);

    if (!anime) {
        return res.status(404).send("Anime not found");
    }

    res.json(anime);
}

const createAnime = async (req, res) => {
    const anime = new Anime(req.body);

    try {
        const newAnime = await anime.save();
        res.status(201).json(newAnime);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const updateAnime = async (req, res) => {
    const { id } = req.params;
    const anime = req.body;

    if (!anime) {
        return res.status(400).send("Request body is missing");
    }

    try {
        const updatedAnime = await Anime.findByIdAndUpdate(id, anime, { new: true });
        res.json(updatedAnime);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteAnime = async (req, res) => {
    const { id } = req.params;

    try {
        await Anime.findByIdAndDelete(id);
        res.send("Anime deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getAnimeEpisodes = async (req, res) => {
    const { id } = req.params;
    const anime = await Anime.findById(id);

    if (!anime) {
        return res.status(404).send("Anime not found");
    }

    res.json(anime.episodes);
}

const getAnimeCategories = async (req, res) => {
    const { id } = req.params;
    const anime = await Anime.findById(id);

    if (!anime) {
        return res.status(404).send("Anime not found");
    }

    res.json(anime.categories);
}

const getTrendingAnimes = async (req, res) => {
    const animes = await Anime.find({ isInTrending: true });
    res.json(animes);
}

const getReleasedAnimes = async (req, res) => {
    const animes = await Anime.find({ status: "ongoing" });
    res.json(animes);
}

const getCompletedAnimes = async (req, res) => {
    const animes = await Anime.find({ status: "completed" });
    res.json(animes);
}

const getAnimeFilterSeason = async (req, res) => {
    try {
        const { id } = req.params;
        let { season } = req.params; 
        season = parseInt(season);
        const anime = await Anime.findById(id);
        if (!anime) {
            return res.status(404).send("Anime not found");
        }
        const episodesOfSeason = anime.episodes.filter(episode => episode.season == season);
        anime.episodes = episodesOfSeason;
        res.json(anime);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    getAnimes,
    getAnime,
    createAnime,
    updateAnime,
    deleteAnime,
    getAnimeEpisodes,
    getAnimeCategories,
    getTrendingAnimes,
    getReleasedAnimes,
    getCompletedAnimes,
    getAnimeFilterSeason
};