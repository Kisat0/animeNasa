import { useTheme } from "@mui/material";
import "./Header.scss";
import { PlayIcon } from "../../utils/Icons";
import Image from "../../assets/images/konosuba.webp";

const Header = ({color}) => {
  const theme = useTheme().palette;
  return (
    <header className="header">
      <img src={Image} alt="" id="header-background" />
      <div>
        <div>
          <div
            className="anime-status"
            style={{
              color: theme.text.grey,
            }}
          >
            <p>SAISON 1</p>
            <p> | </p>
            <p>EPISODE 1</p>
          </div>
          <h1>Konosuba</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur nostrum tempora architecto nam. Eaque quisquam modi
            necessitatibus magni exercitationem sint eveniet porro molestiae.
            Repellendus dolore omnis fugit esse vero corporis.
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
        <img
          src="https://fr.web.img3.acsta.net/pictures/20/09/14/10/31/4875617.jpg"
          alt="Group-1"
        />
      </div>
    </header>
  );
};

export default Header;
