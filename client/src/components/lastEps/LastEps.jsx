import { MegaphoneIcon } from "../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import "./LastEps.scss";

const LastEps = ({ data }) => {
  const theme = useTheme().palette;
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <div>
          <MegaphoneIcon />
          <h1>Derniers épisodes:</h1>
        </div>
        <span></span>
      </div>
      <div className="last-eps-container">
        {data.map((episode) => (
          <div
            key={episode._id}
            onClick={() => navigate(`/watch/${episode._id}`)}
          >
            <img src={episode.thumbnail} alt={episode.title} />
            <div>
              <p style={{ backgroundColor: theme.tags.season }}>
                Saison {episode.season}
              </p>
              <p style={{ backgroundColor: theme.tags.vf }}>
                {episode.lang.toUpperCase()}
              </p>
            </div>
            <p
              style={{
                backgroundColor: theme.tags.episode,
                marginBottom: "5px",
              }}
            >
              Episode {episode.number}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LastEps;
