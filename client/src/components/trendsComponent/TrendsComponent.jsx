import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import './TrendsComponent.scss';
import { StarIcon } from "../../utils/Icons";
import { useNavigate } from 'react-router-dom';

const TrendsComponent = ({ anime }) => {
    const theme = useTheme().palette;
    const navigate = useNavigate();

    return (
        <div className="seasons-carousel-item" onClick={() => navigate(`/summary/${anime._id}`)}>
            <img src={anime.poster} alt="jujutsu kaisen" />
            <div>
                <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>{anime.title}</p>
                <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S{anime.episodes[anime.episodes.length - 1].season}</p>
            </div>

            <div>
                <p style={{ backgroundColor: theme.tags.season }}>
                    <StarIcon />
                    {anime.rating}
                </p>
                <p style={{ backgroundColor: theme.tags.season }}>{anime.episodes.length} EP</p>
            </div>
        </div>
    );
};

export default TrendsComponent;
