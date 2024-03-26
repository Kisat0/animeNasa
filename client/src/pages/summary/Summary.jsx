import SerieDetails from "../../components/serieDetails/SerieDetails";
import Seasons from "../../components/seasons/Seasons";
import "./Summary.scss"
import { useTheme } from "@mui/material"
var json = require("../../utils/fr.json");

const Summary = () => {

    const theme = useTheme().palette;

    return (
        <div className="SummaryGlobal">
            <div className="AnimeInfos">
                <img src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />
                <h1>Jujutsu Kaisen</h1>
                <div className="genres">
                    <h3 style={{ background: theme.background.episodeWatched }}>Comédie</h3>
                    <h3 style={{ background: theme.background.episodeWatched }}>Action</h3>
                    <h3 style={{ background: theme.background.episodeWatched }}>Isekai</h3>
                    <h3 style={{ background: theme.background.episodeWatched }}>Fantastique</h3>
                </div>
                <h3>{json.summary.Description}</h3>

            </div>
            <div className="SerieComponent">
                <SerieDetails/>
                <SerieDetails/>
                <SerieDetails/>
            </div>
            <div className="SeasonList">
                <Seasons/>
                <Seasons/>
                <Seasons/>
            </div>
            <img src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" className="background" />
        </div>
        
    );
}
export default Summary;