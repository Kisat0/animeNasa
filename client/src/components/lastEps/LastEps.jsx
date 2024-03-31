import { MegaphoneIcon } from "../../utils/Icons";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LastEps.scss";
import Loader from "../loader/loader";

const LastEps = () => {
  const [lastEps, setLastEps] = useState([]);

  const theme = useTheme().palette;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastEps = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_ADDRESS}/episodes/latest/${0}`
        );
        const data = await res.json();
        setLastEps(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLastEps();
  }, []);

  if (!lastEps) {
    return <Loader />;
  }

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
        {lastEps.map((episode) => (
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
