import "./SerieDetails.scss"
import { useTheme } from "@mui/material"
var json = require("../../utils/fr.json");

const SerieDetails = () => {

    const theme = useTheme().palette;

    return (
        <div className="episode-details">
            <img src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />
            <div className="episode-txt">
                <div className="episode-infos">
                    <div className="episode-description" >
                        <h1 style={{ color: theme.text.primary }}>{json.summary.Episode} </h1>
                        <p style={{ color: theme.text.grey }}>{json.summary.Description}</p>
                    </div>
                    <div className="episode-time" style={{ color: theme.text.secondary }}>
                        <p style={{ color: theme.text.grey }}>{json.summary.Duration} 24m</p>
                        <p style={{ color: theme.text.grey }}>25 avril 2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SerieDetails;






