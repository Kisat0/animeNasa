import {
  TrendIcon,
  StarIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "../../utils/Icons";
import "./Trends.scss";
import { useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import TrendsComponent from "../trendsComponent/TrendsComponent";
import Loader from "../loader/loader";
import { colorDarker } from "../../utils/Color";

const Trends = ({color}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [dataTrends, setDataTrends] = useState([]);

  const theme = useTheme().palette;

  const handleCarousel = (index) => {
    const carousel = document.querySelector(".trend-carousel");
    const carouselItems = document.querySelector(".trend-carousel-items");
    const carouselItem = document.querySelector(".trend-carousel-items > div");

    const carouselItemWidth = carouselItem.offsetWidth;
    const carouselWidth = carousel.offsetWidth;

    const carouselItemsNumberVisible = Math.floor(
      carouselWidth / carouselItemWidth
    );

    const carouselItemsWidthVisible =
      carouselItemsNumberVisible * carouselItemWidth;
    const endItems = carouselItems.children.length % carouselItemsNumberVisible;
    const endItemsWidth = endItems * carouselItemWidth;

    if (index === 1) {
      if (
        carouselIndex <
        Math.floor(carouselItems.children.length / carouselItemsNumberVisible)
      ) {
        setCarouselIndex(carouselIndex + 1);

        if (
          carouselIndex + 1 ===
          Math.floor(carouselItems.children.length / carouselItemsNumberVisible)
        ) {
          carouselItems.style.transform = `translateX(-${
            carouselItemsWidthVisible * carouselIndex + endItemsWidth + 350
          }px)`;
        } else {
          carouselItems.style.transform = `translateX(-${
            carouselItemsWidthVisible * (carouselIndex + 1)
          }px)`;
        }
      }
    } else if (index === -1) {
      if (carouselIndex > 0) {
        setCarouselIndex(carouselIndex - 1);
        carouselItems.style.transform = `translateX(-${
          carouselItemsWidthVisible * (carouselIndex - 1)
        }px)`;
      }
    }
  };

  const getAnimeTrends = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ADDRESS}/animes/trends`
      );
      const data = await res.json();
      setDataTrends(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnimeTrends();
  }, []);

  if (!dataTrends) {
    return <Loader />;
  }

  return (
    <section>
      <div>
        <div>
          <TrendIcon />
          <h1>Tendances:</h1>
        </div>
        <span
          style={{
            background: `linear-gradient(-270deg, ${color} 0%, ${colorDarker(
              color
            )} 50.52%, transparent 100%)`,
          }}
        ></span>
      </div>
      <div className="trend-carousel">
        <div className="trend-carousel-arrows">
          <span
            className="trend-carousel-arrow"
            onClick={() => handleCarousel(-1)}
          >
            <LeftArrowIcon />
          </span>
          <span
            className="trend-carousel-arrow"
            onClick={() => handleCarousel(1)}
          >
            <RightArrowIcon />
          </span>
        </div>
        <div className="trend-carousel-items">
          {dataTrends.map((anime) => (
            <TrendsComponent key={anime} anime={anime} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trends;
