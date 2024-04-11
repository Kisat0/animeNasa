import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import NewsPageAnimes from "../../components/newsPageAnimes/NewsPageAnimes";
import json from "../../utils/fr.json";
import "./News.scss";
import Loader from "../../components/loader/loader";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
  const [anime, setAnime] = useState("6604985745954d85e7d15b00");
    const [dataA, setDataA] = useState([]);
    
    const navigate = useNavigate();

  const getNewsEpisodes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/episodes/news`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const handleNewsPageAnimesClick = async (anime) => {
    try {
      setAnime(anime);
      const response = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/animes/${anime}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }
      const dataA = await response.json();
      setDataA(dataA);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  useEffect(() => {
    getNewsEpisodes();
    handleNewsPageAnimesClick(anime);
  }, []);

  if (!anime || !dataA || !data) return <Loader />;

  return (
    <div className="NewsPage">
      <Navbar />

      <div
        className="NewsTitleDesc"
        style={{ backgroundImage: `url(${dataA.thumbnail})` }}
      >
        <h1>{dataA.title}</h1>
        <p>
          {dataA.description?.length > 500
            ? dataA.description.substring(0, 500) + "..."
            : dataA.description}
        </p>
      </div>
      <div className="NewComponentBlock">
        {data.map((item, index) => (
          <NewsPageAnimes
            key={index}
            {...item}
                onClick={() => navigate(`/watch/${item._id}`)}
                onMouseEnter={() => handleNewsPageAnimesClick(item.anime)}
          />
        ))}
      </div>
    </div>
  );
};

export default News;
