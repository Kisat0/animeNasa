import "./NewsPageAnimes.scss"
import { useTheme } from "@mui/material"
var json = require("../../utils/fr.json");

const NewsPageAnimes = () => {

    const theme = useTheme().palette;

    return (
        <div className="NewsContainer">
            <img src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />
            <div className="NewsInfos">
                <h1>Jujutsu Kaisen</h1>
                <p>S3 Episode 17</p>
            </div>
        </div>
    );
}
export default NewsPageAnimes;






