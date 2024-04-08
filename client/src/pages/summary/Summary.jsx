import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from "../../components/navbar/Navbar";
import SerieDetails from "../../components/serieDetails/SerieDetails";
import Seasons from "../../components/seasons/Seasons";

import { useTheme, Backdrop, CircularProgress } from "@mui/material"
import "./Summary.scss";

const SummaryPage = () => {
    const [data, setData] = useState({});
    const [open, setOpen] = useState(true); // Initialiser le Backdrop à ouvert
    const [dataNumberSeasons, setDataNumberSeasons] = useState([]);
    const [activeSeason, setActiveSeason] = useState(null);

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
                    setOpen(false);
                } else {
                    setOpen(false); // Fermer le Backdrop en cas d'erreur
                }
            });
    };

    const getNumberSeasons = async () => {
        await fetch(`${process.env.REACT_APP_API_ADDRESS}/episodes/numberSeasons/${animeID}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(async (response) => {
                return {
                    status: response.status,
                    dataNumberSeasons: await response.json(),
                };
            })
            .then(({ status, dataNumberSeasons }) => {
                if (status == 200) {
                    setDataNumberSeasons(dataNumberSeasons);
                }
            });
    }

    const handleSeasonEpisodes = async (season) => {
        await fetch(`${process.env.REACT_APP_API_ADDRESS}/animes/filter/${animeID}/${season}`, {
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
                    setOpen(false);
                } else {
                    setOpen(false); // Fermer le Backdrop en cas d'erreur
                }
            });
    }

    useEffect(() => {
        getAnime();
        getNumberSeasons();
    }, []);

    return (
        <div>
            <Navbar />
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
                        <div className='imgSummary'>
                            <img src={data.poster} alt="jujutsu kaisen" />
                        </div>
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
                            <SerieDetails key={episode} episode={episode} />
                        ))}
                    </div>
                    <div className="SeasonList">
                        {dataNumberSeasons.map((season) => (
                            <Seasons key={`${animeID}-${season}`} season={season} onClick={handleSeasonEpisodes} activeSeason={activeSeason}
                                setActiveSeason={setActiveSeason} />
                        ))}
                    </div>


                    <img src={data.thumbnail} alt="jujutsu kaisen" className="backgroundGrayscale" />
                </div>
            ) : null}
        </div>

    );
}

export default SummaryPage;