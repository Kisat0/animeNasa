const Episode = require('../models/episode');

const getEpisodes = async (req, res) => {
    try {
        const episodes = await Episode.find();
        res.json(episodes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getEpisode = async (req, res) => {
    const { id } = req.params;
    const episode = await Episode
        .findById(id)
}

const getEpisodesByAnime = async (req, res) => {
    const { animeId } = req.params;
    const episodes = await Episode.find({ animeId });
    res.json(episodes);
}

const createEpisode = async (req, res) => {
    const episode = new Episode(req.body);

    try {
        const newEpisode = await episode.save();
        res.status(201).json(newEpisode);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const updateEpisode = async (req, res) => {
    const { id } = req.params;
    const episode = req.body;

    if (!episode) {
        return res.status(400).send("Request body is missing");
    }

    try {
        const updatedEpisode = await Episode.findByIdAndUpdate(id, episode, { new: true });
        res.json(updatedEpisode);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteEpisode = async (req, res) => {
    const { id } = req.params;

    try {
        await Episode.findByIdAndDelete(id);
        res.send("Episode deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getEpisodes,
    getEpisode,
    getEpisodesByAnime,
    createEpisode,
    updateEpisode,
    deleteEpisode,
};