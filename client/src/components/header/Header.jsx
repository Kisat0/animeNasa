import { useTheme } from "@mui/material";
import "./Header.scss";
import { PlayIcon } from "../../utils/Icons";
import { useState } from "react";

const Header = ({ color, data }) => {
  const theme = useTheme().palette;
  const [currentTitle, setCurrentTitle] = useState(data[0]?.anime.title);
  const [currentBackground, setCurrentBackground] = useState(data[0].thumbnail);
  const [currentSeason, setCurrentSeason] = useState(data[0].season);
  const [currentNumber, setCurrentNumber] = useState(data[0].number);
  const [currentPoster, setCurrentPoster] = useState(data[0]?.anime.poster);
  const [currentDesc, setCurrentDesc] = useState(data[0]?.anime.description);


  return (
    <header className="header">
      <img src={currentBackground} alt="" id="header-background" />
      <div>
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
            {currentDesc.length > 100
              ? currentDesc.substring(0, 100) + "..."
              : currentDesc}
          </p> 
          <div className="header-buttons">
            <button
              style={{
                backgroundColor: color,
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
    </header>
  );
};

export default Header;
