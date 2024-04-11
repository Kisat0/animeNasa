import { MegaphoneIcon } from "../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { colorDarker } from "../../utils/Color";
import "./LastEps.scss";

const LastEps = ({ data, color }) => {
  const theme = useTheme().palette;
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <div>
          <MegaphoneIcon />
          <h1>Derniers épisodes:</h1>
        </div>
        <span
          style={{
            background: `linear-gradient(-270deg, ${color} 0%, ${colorDarker(
              color
            )} 50.52%, transparent 100%)`,
          }}
        ></span>
      </div>
      <div className="last-eps-container">
        {data.map((episode, index) => (
          <div
            key={episode._id}
            onClick={() => {
              if (index === 0) {
                navigate(`/watch/${episode._id}?isComingSoon=true`);
              } else {
                navigate(`/watch/${episode._id}`);
              }
            }}
          >
            <img src={episode.thumbnail} alt={episode.title} />
            {index === 0 ? (
              <p className="coming-soon">Prochainement</p>
            ) : (
              <>
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
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LastEps;
