import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { StarIcon } from "../../utils/Icons";
import { useNavigate } from 'react-router-dom';

const NewsSeasonsComponent = ({ anime }) => {
    const theme = useTheme().palette;
    const navigate = useNavigate();

    return (
        <div className="seasons-carousel-item" onClick={() => navigate(`/summary/${anime._id}`)}>
           <img src={anime.poster} alt="jujutsu kaisen" />
            <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                {anime.rating}</p>
            <div className="seasons-anime-title-container">
                <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                    {anime.title}
                </p>
            </div>
        </div>
    );
};

export default NewsSeasonsComponent;
