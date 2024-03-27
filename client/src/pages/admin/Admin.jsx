import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MultiSelect from "../../components/multiselect/MultiSelect";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  select: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const AdminPage = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState("");
  const [poster, setPoster] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const animeCategories = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Magic",
    "Mecha",
    "Music",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
    "Thriller",
    "Horror",
    "Martial Arts",
    "Ecchi",
    "Harem",
    "Shoujo Ai",
    "Isekai",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const animeData = {
      title,
      description,
      releaseDate,
      rating,
      status,
      categories,
      poster,
      thumbnail,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/animes`,
        animeData
      );
      console.log(response.data);
      setTitle("");
      setDescription("");
      setReleaseDate("");
      setRating("");
      setStatus("");
      setCategories("");
      setPoster("");
      setThumbnail("");
    } catch (error) {
      console.error(error);
    }
  };

  const [animes, setAnimes] = useState([]);
  const [titleEpisode, setTitleEpisode] = useState("");
  const [descriptionEpisode, setDescriptionEpisode] = useState("");
  const [number, setNumber] = useState("");
  const [releaseDateEpisode, setReleaseDateEpisode] = useState("");
  const [source, setSource] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [anime, setAnime] = useState("");
  const [lang, setLang] = useState("");

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/animes`
        );
        setAnimes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimes();
  }, []);

  const handleSubmitEpisode = async (e) => {
    e.preventDefault();

    const episodeData = {
      title: titleEpisode,
      description: descriptionEpisode,
      number,
      lang,
      releaseDate: releaseDateEpisode,
      source,
      duration,
      season,
      anime,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/episodes`,
        episodeData
      );
      console.log(response.data);
      setTitleEpisode("");
      setDescriptionEpisode("");
      setNumber("");
      setReleaseDate("");
      setSource("");
      setDuration("");
      setSeason("");
      setLang("");
      setAnime("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.textField}
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          variant="outlined"
          color="primary"
        />
        <TextField
          className={classes.textField}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          variant="outlined"
          color="primary"
          multiline
          rows={4}
        />
        <TextField
          className={classes.textField}
          label="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="date"
        />
        <TextField
          className={classes.textField}
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          variant="outlined"
          color="primary"
        />
        <Select
          labelId="status"
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"ongoing"}>Ongoing</MenuItem>
          <MenuItem value={"completed"}>Completed</MenuItem>
        </Select>
        <MultiSelect
          data={animeCategories}
          label={"Categories"}
          color="primary"
          placeholder={"Choose categories"}
          onSelectionChange={(data) => setCategories(data)}
        />
        <TextField
          className={classes.textField}
          label="Poster"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
          required
          variant="outlined"
          color="primary"
        />
        <TextField
          className={classes.textField}
          label="Thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          variant="outlined"
          color="primary"
        />
        <Button
          className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
      <form className={classes.form} onSubmit={handleSubmitEpisode}>
        <TextField
          className={classes.textField}
          label="Title"
          value={titleEpisode}
          onChange={(e) => setTitleEpisode(e.target.value)}
          required
          variant="outlined"
          color="primary"
        />
        <TextField
          className={classes.textField}
          label="Description"
          value={descriptionEpisode}
          onChange={(e) => setDescriptionEpisode(e.target.value)}
          required
          variant="outlined"
          color="primary"
          multiline
          rows={4}
        />
        <TextField
          className={classes.textField}
          label="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="number"
        />
        <TextField
          className={classes.textField}
          label="Release Date"
          value={releaseDateEpisode}
          onChange={(e) => setReleaseDateEpisode(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="date"
        />
        <TextField
          className={classes.textField}
          label="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          variant="outlined"
          color="primary"
        />
        <Select
          labelId="lang"
          value={lang}
          label="Lang"
          onChange={(e) => setLang(e.target.value)}
          className={classes.select}
        >
          <MenuItem value={"VO"}>VO</MenuItem>
          <MenuItem value={"VF"}>VF</MenuItem>
          <MenuItem value={"VOSTFR"}>VOSTFR</MenuItem>
        </Select>

        <TextField
          className={classes.textField}
          label="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="number"
        />
        <TextField
          className={classes.textField}
          label="Season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
          variant="outlined"
          color="primary"
          type="number"
        />
        <Select
          labelId="anime"
          value={anime}
          label="Anime"
          onChange={(e) => setAnime(e.target.value)}
          className={classes.select}
        >
          {animes.map((anime) => (
            <MenuItem key={anime._id} value={anime._id}>
              {anime.title}
            </MenuItem>
          ))}
        </Select>
        <Button
          className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AdminPage;
