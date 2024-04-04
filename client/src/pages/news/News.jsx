import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import NewsPageAnimes from "../../components/newsPageAnimes/NewsPageAnimes";
import json from "../../utils/fr.json";
import "./News.scss";

const News = () => {
    const [data, setData] = useState([]);
    const [anime, setAnime] = useState("6604985745954d85e7d15b00");
    const [dataA, setDataA] = useState([]);


    const getNewsEpisodes = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/episodes/news`);
            if (!response.ok) {
                throw new Error('Failed to fetch episodes');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    };

    const handleNewsPageAnimesClick = async (anime) => {
        try {
            setAnime(anime);
            const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/animes/${anime}`);
            if (!response.ok) {
                throw new Error('Failed to fetch anime');
            }
            const dataA = await response.json();
            setDataA(dataA);
        } catch (error) {
            console.error('Error fetching anime:', error);
        }
    };

    useEffect(() => {
        getNewsEpisodes();
       handleNewsPageAnimesClick(anime);
    }, []);

    return (
        <div className="NewsPage">
            <Navbar />
            <img className="backgroundNews" src= {dataA.thumbnail} />


            <div className="NewsTitleDesc">
                <h1>{dataA.title}</h1>
                <p>{dataA.description}</p>
            </div>
            <div className="black-gradiant"></div>
            <div className="NewComponentBlock">
                {data.map((item, index) => (
                    <NewsPageAnimes key={index} {...item} onClick={() => handleNewsPageAnimesClick(item.anime)}/>
                ))}
            </div>
        </div>
    );
};

export default News;
