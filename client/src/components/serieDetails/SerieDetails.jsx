import "./SerieDetails.scss"
import { useTheme } from "@mui/material"
var json = require("../../utils/fr.json");

const SerieDetails = ({ episode }) => {
    const theme = useTheme().palette;

    const dateString = episode.releaseDate;
    const date = new Date(dateString);

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);

    return (
        <div className="episode-details">
            <img src={episode.thumbnail} alt="jujutsu kaisen" />
            <div className="episode-txt" style={{ background: theme.background.episodeDetailsBackground}}>
                <div className="episode-infos">
                    <div className="episode-description" >
                        <h1 style={{ color: theme.text.primary }}>{episode.title}</h1>
                        <p style={{ color: theme.text.grey }}>{episode.description}</p>
                    </div>
                    <div className="episode-time" style={{ color: theme.text.secondary }}>
                        <p style={{ color: theme.text.grey }}>{json.summary.Duration} {episode.duration}</p>
                        <p style={{ color: theme.text.grey }}>{formattedDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SerieDetails;






