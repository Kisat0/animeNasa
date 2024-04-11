import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import json from "../../utils/fr.json";
import "./NewsPageAnimes.scss";

const NewsPageAnimes = ({
  anime,
  season,
  number,
  thumbnail,
  _id,
  onClick,
  onMouseEnter,
}) => {
  const [dataAnime, setDataAnime] = useState([]);
  const theme = useTheme().palette;

  const handleOnClick = () => {
    onClick(anime);
  };

  const getAnime = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/animes/${anime}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }
      const dataAnime = await response.json();
      setDataAnime(dataAnime);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    getAnime();
  }, []);

  return (
    <div
      className="NewsContainer"
      onClick={handleOnClick}
      onMouseEnter={onMouseEnter}
    >
      <div className="ImgNewsCompo">
        <img
          className="imgNewsComponent"
          src={thumbnail}
          alt="jujutsu kaisen"
        />
      </div>
      <div className="NewsInfos">
        <h1>{dataAnime.title}</h1>
        <div className="EpisodeData">
          <p>S{season}</p>
          <p>Episode {number}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPageAnimes;
