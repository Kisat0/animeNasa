import { TrendIcon, StarIcon, LeftArrowIcon, RightArrowIcon } from "../../utils/Icons";
import "./Trends.scss";
import { useTheme } from "@mui/material";
import { useState } from "react";


const Trends = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);

    const theme = useTheme().palette;

    const handleCarousel = (index) => {
        const carousel = document.querySelector(".trend-carousel");
        const carouselItems = document.querySelector(".trend-carousel-items");
        const carouselItem = document.querySelector(".trend-carousel-items > div");

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
                    <TrendIcon />
                    <h1>Tendances:</h1>
                </div>
                <span></span>
            </div>
            <div className="trend-carousel">
                <div className="trend-carousel-arrows">
                    <span className="trend-carousel-arrow" onClick={() => handleCarousel(-1)}><LeftArrowIcon /></span>
                    <span className="trend-carousel-arrow" onClick={() => handleCarousel(1)}><RightArrowIcon /></span>

                </div>
                <div className="trend-carousel-items">
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://www.melty.fr/wp-content/uploads/meltyfr/2022/03/747354-black-clover-annule-la-fin-de-l-anime-opengraph_1200-1.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://media.senscritique.com/media/000017303103/1200/black_clover.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://furansujapon.com/wp-content/uploads/2021/12/black-clover-une.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://images.alphacoders.com/605/605592.png" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://static.wikia.nocookie.net/naruto/images/1/1b/Mode_Baryon.png/revision/latest?cb=20210926143548&path-prefix=fr" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://fr.web.img5.acsta.net/c_310_420/pictures/19/09/18/13/46/0198270.jpg" alt="trend" />
                        <p className="trend-season-info" style={{ backgroundColor: theme.tags.season }}>S17</p>
                        <div>
                            <p style={{ backgroundColor: theme.tags.season }}>
                                <StarIcon />
                                7.7
                            </p>
                            <p style={{ backgroundColor: theme.tags.season }}>407 EP</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Trends;