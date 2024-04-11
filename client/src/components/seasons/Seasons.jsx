import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import './Seasons.scss';

const Seasons = ({ season, onClick, activeSeason }) => {
    const theme = useTheme().palette;
    const [clicked, setClicked] = useState(false);

    const handleOnClick = () => {
        onClick(season);
        setClicked(!clicked);
    };

    return (
        <h1
            className="textSeason"
            style={{
                background: season === activeSeason ? 'white' : theme.background.episodeWatched,
                color: season === activeSeason ? 'black' : 'white',
                
            }}
            onClick={handleOnClick}
        >
            S{season}
        </h1>
    );
};

export default Seasons;
