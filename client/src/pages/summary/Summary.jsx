import React, { useState } from 'react';
import SerieDetails from "../../components/serieDetails/SerieDetails";
import Seasons from "../../components/seasons/Seasons";
import { useLocation } from 'react-router-dom';
import "./Summary.scss"
import { useTheme, Backdrop, CircularProgress } from "@mui/material"
import { useEffect } from "react";
var json = require("../../utils/fr.json");

const Summary = () => {
    const [data, setData] = useState({});
    const [open, setOpen] = useState(true); // Initialiser le Backdrop à ouvert
    const theme = useTheme().palette;

    // récupérer l'id dans l'url et récupérer l'anime qui a cet id
    const location = useLocation();
    const animeID = location.pathname.split("/").pop();

    const getAnime = async () => {
        await fetch(`${process.env.REACT_APP_API_ADDRESS}/animes/${animeID}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(async (response) => {
        return {
            status: response.status,
            data: await response.json(),
        };
        })
        .then(({ status, data }) => {
            if (status == 200) {
                setData(data);
                console.log(data);
                setOpen(false);
            } else {
                setOpen(false); // Fermer le Backdrop en cas d'erreur
            }
        });
    };

    useEffect(() => {
        getAnime();
    }, []);

    return (
        <div>
            {open && (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {data && Object.keys(data).length > 0 ? (
                <div className="SummaryGlobal">
                    <div className="AnimeInfos">
                        <img src={data.thumbnail} alt="jujutsu kaisen" />
                        <h1>{data.title}</h1>
                        <div className="genres">
                        {data.categories.map((category) => (
                            <h3 key={category} style={{ background: theme.background.episodeWatched }}>
                            {category}
                            </h3>
                        ))}
                        </div>
                        <h3>{data.description}</h3>

                    </div>
                    <div className="SerieComponent">
                        {data.episodes.map((episode) => (
                        <SerieDetails/>
                        ))}
                    </div>
                    <div className="SeasonList">
                        <Seasons/>
                        <Seasons/>
                        <Seasons/>
                    </div>
                    <img src={data.thumbnail} alt="jujutsu kaisen" className="background" />
                </div>
            ): null}
        </div>
        
    );
}
export default Summary;