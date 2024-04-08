import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import './Seasons.scss';

const Seasons = ({ season, onClick }) => {
    const theme = useTheme().palette;
    const [clicked, setClicked] = useState(false);

    const handleOnClick = () => {
        onClick(season);
        setClicked(true);
    };

    return (
        <h1
            className="textSeason"
            style={{
                background: clicked ? 'white' : theme.background.episodeWatched,
                color: clicked ? 'black' : 'white',
                transform: clicked ? 'scale(1.05)' : 'scale(1.00)',
            }}
            onClick={handleOnClick}
        >
            S{season}
        </h1>
    );
};

export default Seasons;
