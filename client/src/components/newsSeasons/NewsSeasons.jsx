import { useTheme } from "@mui/material"
import { FlashIcon, StarIcon, LeftArrowIcon, RightArrowIcon } from "../../utils/Icons";
import { useState } from "react";


import "./NewsSeasons.scss"

const NewsSeasons = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const theme = useTheme().palette;

    const handleCarousel = (index) => {
        const carousel = document.querySelector(".seasons-carousel");
        const carouselItems = document.querySelector(".seasons-carousel-items");
        const carouselItem = document.querySelector(".seasons-carousel-item");

        console.log(carousel);
        console.log(carouselItems);
        console.log(carouselItem);

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
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                    <div className="seasons-carousel-item">
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="season-note" style={{ backgroundColor: theme.tags.season }}><StarIcon />
                            7.7</p>
                        <div className="seasons-anime-title-container">
                            <p className="seasons-anime-title" style={{ backgroundColor: theme.background.episode }}>
                                Demon Slayer
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default NewsSeasons;
