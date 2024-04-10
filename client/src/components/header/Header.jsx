import { useTheme } from "@mui/material";
import "./Header.scss";
import { PlayIcon } from "../../utils/Icons";
import { useEffect, useState } from "react";

const Header = ({ data }) => {
  const theme = useTheme().palette;
  const [index, setIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(data[0]?.anime.title);
  const [currentBackground, setCurrentBackground] = useState(
    data[index].thumbnail
  );
  const [currentSeason, setCurrentSeason] = useState(data[0].season);
  const [currentNumber, setCurrentNumber] = useState(data[0].number);
  const [currentPoster, setCurrentPoster] = useState(data[0]?.anime.poster);
  const [currentDesc, setCurrentDesc] = useState(
    data[index]?.anime.description
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    setCurrentTitle(data[index]?.anime.title);
    setCurrentBackground(data[index]?.thumbnail);
    setCurrentSeason(data[index]?.season);
    setCurrentNumber(data[index]?.number);
    setCurrentPoster(data[index]?.anime.poster);
    setCurrentDesc(data[index]?.anime.description);
  }, [index, data]);

  return (
    <header className="header">
      <img src={currentBackground} alt="" id="header-background" />
      <div className="header-content">
        <div>
          <div
            className="anime-status"
            style={{
              color: theme.text.grey,
            }}
          >
            <p>SAISON {currentSeason}</p>
            <p> | </p>
            <p>EPISODE {currentNumber}</p>
          </div>
          <h1>{currentTitle}</h1>
          <p>
            {currentDesc.length > 300
              ? currentDesc.substring(0, 300) + "..."
              : currentDesc}
          </p>
          <div className="header-buttons">
            <button
              style={{
                backgroundColor: data[index]?.anime.color || theme.buttons.primary,
              }}
            >
              {" "}
              <PlayIcon /> Regarder
            </button>
            <button
              style={{
                backgroundColor: theme.buttons.secondary,
              }}
            >
              Détails
            </button>
          </div>
        </div>
        <img src={currentPoster} alt="Group-1" />
      </div>

      <div className="header-dots">
        {data.map((_, i) => (
          <div
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => {
              setIndex(i);
            }}
          ></div>
        ))}
      </div>
    </header>
  );
};

export default Header;
