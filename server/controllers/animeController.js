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
        const updatedAnime = await Anime.findByIdAndUpdate(id, anime);
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

const getAnimeTrends = async (req, res) => {
    try {
        const animes = await Anime.find().lean(); 
        for (const anime of animes) {
            const trendingScore = calculTrendingScore(anime);
            anime.trendingScore = trendingScore;
        }
        animes.sort((a, b) => b.trendingScore - a.trendingScore);
        res.json(animes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getNewsSeasons = async (req, res) => {
    try {
        const animes = await Anime.find({ status: "ongoing" });
        res.json(animes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


const calculTrendingScore = (anime) => {
    let score = 0;
    const episodes = anime.episodes
    const views = anime.views || 0;
    //date de l ep
    episodes.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    const latestEpisode = episodes[0];
    const timeDifference = new Date() - new Date(latestEpisode.releaseDate);
    const differenceInDays = timeDifference / (1000 * 3600 * 24);
    if (differenceInDays < 1) {
        score += 10;
    }
    else if (differenceInDays < 7) {
        score += 7;
    }
    else if (differenceInDays < 30) {
        score += 5;
    }
    else if (differenceInDays < 365) {
        score += 2;
    }
    //vues de l'ep
    score += views / 10;

    //note de l ep
    score += anime.rating;
    return score;
}

const updateViews = async (req, res) => {
    const { id } = req.params;

    try {
        let updatedAnime = await Anime.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true } 
        );

        if (!updatedAnime) {
            return res.status(404).send("Anime not found");
        }

        res.json(updatedAnime); 
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
    getAnimeFilterSeason,
    getAnimeTrends,
    updateViews,
    getNewsSeasons,
};