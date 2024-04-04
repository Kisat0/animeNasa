import React from 'react';
import { useTheme } from "@mui/material";
import json from "../../utils/fr.json";
import "./NewsPageAnimes.scss";

const NewsPageAnimes = ({ title, description, thumbnail, _id }) => {
    const theme = useTheme().palette;

    const openEpisode = async () => {
        navigate(`/watch/${_id}`);
    };

    return (
        <div className="NewsContainer">
            <div className='ImgNewsCompo'>
                <img className="imgNewsComponent" src={thumbnail} alt="jujutsu kaisen" />
            </div>
            <div className="NewsInfos">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default NewsPageAnimes;
