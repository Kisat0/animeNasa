import { useTheme } from "@mui/material"
import { FlashIcon, StarIcon, LeftArrowIcon, RightArrowIcon } from "../../utils/Icons";
import React, { useState, useEffect } from 'react';
import NewsSeasonsComponent from "../newsSeasonsComponent/NewsSeasonsComponent"


import "./NewsSeasons.scss"

const NewsSeasons = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const theme = useTheme().palette;
    const [DataNewsSeasons, setDataNewsSeasons] = useState([]);

    const handleCarousel = (index) => {
        const carousel = document.querySelector(".seasons-carousel");
        const carouselItems = document.querySelector(".seasons-carousel-items");
        const carouselItem = document.querySelector(".seasons-carousel-item");


        const carouselItemWidth = carouselItem.offsetWidth;
        const carouselWidth = carousel.offsetWidth;



        const carouselItemsNumberVisible = Math.floor(carouselWidth / carouselItemWidth)

        const carouselItemsWidthVisible = carouselItemsNumberVisible * carouselItemWidth;
        const endItems = carouselItems.children.length % carouselItemsNumberVisible;
        const endItemsWidth = endItems * carouselItemWidth;

        if (index === 1) {
            if (carouselIndex < Math.floor((carouselItems.children.length / carouselItemsNumberVisible))) {
                setCarouselIndex(carouselIndex + 1);

                if (carouselIndex + 1 === Math.floor((carouselItems.children.length / carouselItemsNumberVisible))) {
                    carouselItems.style.transform = `translateX(-${(carouselItemsWidthVisible * carouselIndex) + endItemsWidth + 350}px)`;
                }
                else {
                    carouselItems.style.transform = `translateX(-${carouselItemsWidthVisible * (carouselIndex + 1)}px)`;
                }
            }
        }
        else if (index === -1) {
            if (carouselIndex > 0) {
                setCarouselIndex(carouselIndex - 1);
                carouselItems.style.transform = `translateX(-${carouselItemsWidthVisible * (carouselIndex - 1)}px)`;
            }
        }
    }

    const getNewsSeasons = async () => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_ADDRESS}/animes/newsSeasons`
          );
          const data = await res.json();
          setDataNewsSeasons(data);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getNewsSeasons();
    }, []);

    if (!setDataNewsSeasons) {
        return <Loader />;
      }


    return (
        <section>
            <div>
                <div>
                    <FlashIcon />
                    <h1>Saison en cours de sortie :</h1>
                </div>
                <span></span>
            </div>
            <div className="seasons-carousel trend-carousel">
                <div className="trend-carousel-arrows">
                    <span className="trend-carousel-arrow" onClick={() => handleCarousel(-1)}><LeftArrowIcon /></span>
                    <span className="trend-carousel-arrow" onClick={() => handleCarousel(1)}><RightArrowIcon /></span>

                </div>
                <div className="trend-carousel-items seasons-carousel-items">
                {DataNewsSeasons.map((anime) => (
                        <NewsSeasonsComponent key={anime} anime={anime} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default NewsSeasons;
