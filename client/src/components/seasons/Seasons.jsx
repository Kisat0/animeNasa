import "./Seasons.scss"
import { useTheme } from "@mui/material"
var json = require("../../utils/fr.json");

const Seasons = () => {

    const theme = useTheme().palette;

    return (
        <h1 className="textSeason" style={{ background: theme.background.episodeWatched }}>S1</h1>
    );
}
export default Seasons;



