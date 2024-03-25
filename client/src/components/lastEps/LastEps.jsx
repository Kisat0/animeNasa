import { MegaphoneIcon } from "../../utils/Icons";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LastEps.scss"

const LastEps = () => {

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
                <div onClick={() => navigate("/watch/1")}>
                    <img src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />
                    <div>
                        <p style={{ backgroundColor: theme.tags.season }} >Saison 3</p>
                        <p style={{ backgroundColor: theme.tags.vf }} >VF</p>
                    </div>
                    <p style={{
                        backgroundColor: theme.tags.episode,
                        marginBottom: "5px"
                    }}  >Episode 33</p>
                </div>
            </div>
        </section>
    )
}

export default LastEps;