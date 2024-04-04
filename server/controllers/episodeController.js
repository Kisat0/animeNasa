const Episode = require("../models/episode");
const Anime = require("../models/anime");

const getEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getEpisode = async (req, res) => {
  const { id } = req.params;
  const episode = await Episode.findById(id);

  if (!episode) {
    return res.status(404).send("Episode not found");
  }

  res.status(200).json(episode);
};

const getLatestEpisodes = async (req, res) => {
  const { index } = req.params;
  const episodes = await Episode.find()
    .sort({ createdAt: -1 })
    .limit(8)
    .skip(index || 0);

  res.json(episodes);
};

const getNewsEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find()
      .sort({ releaseDate: -1 })
      .limit(20);

    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const getEpisodesByAnime = async (req, res) => {
  const { animeId } = req.params;
  const episodes = await Episode.find({ animeId });
  res.json(episodes);
};

const createEpisode = async (req, res) => {
  const episode = new Episode(req.body);

  try {
    const anime = await Anime.findById(episode.anime);
    episode.thumbnail = anime.thumbnail;
    const newEpisode = await episode.save();

    anime.episodes.push(newEpisode);
    anime.episodes.sort((a, b) => a - b);
    await anime.save();

    res.status(201).json(newEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateEpisode = async (req, res) => {
  const { id } = req.params;
  const episode = req.body;

  if (!episode) {
    return res.status(400).send("Request body is missing");
  }

  try {
    const updatedEpisode = await Episode.findByIdAndUpdate(id, episode, {
      new: true,
    });
    res.json(updatedEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteEpisode = async (req, res) => {
  const { id } = req.params;

  try {
    await Episode.findByIdAndDelete(id);
    res.send("Episode deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getEpisodes,
  getEpisode,
  getEpisodesByAnime,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  getLatestEpisodes,
  getNewsEpisodes
};
