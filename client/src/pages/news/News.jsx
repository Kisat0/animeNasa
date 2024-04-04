import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import NewsPageAnimes from "../../components/newsPageAnimes/NewsPageAnimes";
import json from "../../utils/fr.json";
import "./News.scss";

const News = () => {
    const [data, setData] = useState([]);

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

    useEffect(() => {
        getNewsEpisodes();
    }, []);

    return (
        <div className="NewsPage">
            <Navbar />
            <img className="backgroundNews" src="https://static.bandainamcoent.eu/high/jujutsu-kaisen/jujutsu-kaisen-cursed-clash/00-page-setup/JJK-header-mobile2.jpg" alt="jujutsu kaisen" />


            <div className="NewsTitleDesc">
                <h1>Jujutsu Kaisen</h1>
                <p>{json.summary.Description}</p>
            </div>
            <div className="black-gradiant"></div>
            <div className="NewComponentBlock">
                {data.map((item, index) => (
                    <NewsPageAnimes key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default News;
