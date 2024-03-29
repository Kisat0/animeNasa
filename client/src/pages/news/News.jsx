import "./News.scss"
import { useTheme } from "@mui/material"
import NewsPageAnimes from "../../components/newsPageAnimes/NewsPageAnimes";
var json = require("../../utils/fr.json");

const News = () => {

    const theme = useTheme().palette;

    return (
        <div className="NewsPage">
            <img className="backgroundNews" src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />

            <div className="NewsTitleDesc">
                <h1>Jujutsu Kaisen</h1>
                <p>{json.summary.Description}</p>
            </div >
            <div className="black-gradiant">
            </div>
            <div className="NewComponentBlock">
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
                <NewsPageAnimes />
            </div>

        </div>

    );
}
export default News;




