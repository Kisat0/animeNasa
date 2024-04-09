import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import LastEps from "../../components/lastEps/LastEps";
import Loader from "../../components/loader/loader";
import Navbar from "../../components/navbar/Navbar";
import NewsSeasons from "../../components/newsSeasons/NewsSeasons";
import Trends from "../../components/trends/Trends";
import { useState, useEffect } from "react";
import getDominantColor from "../../utils/Color";
import { useTheme } from "@mui/material";
import Image from "../../assets/images/konosuba.webp";
import axios from "axios";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastEps, setLastEps] = useState([]);
  const [color, setColor] = useState();
  const [dataHeader, setDataHeader] = useState();

  const theme = useTheme().palette;

  useEffect(() => {
    const fetchLastEps = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/episodes/latest/${0}`
        );
        const data = res.data;
        setLastEps(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchThreeTrending = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/episodes/latest/${0}`
        );
        const data = res.data;

        const animePromises = data.map(async (episode) => {
          const animeRes = await axios.get(
            `${process.env.REACT_APP_API_ADDRESS}/animes/${episode.anime}`
          );
          return animeRes.data;
        });

        const animeData = await Promise.all(animePromises);

        data.forEach((episode, index) => {
          episode.anime = animeData[index];
        });

        setDataHeader(data);
      } catch (error) {
        console.error(error);
      }
    };


    setIsLoading(true);

    getDominantColor(Image)
      .then((color) => {
        setColor(color);
      })
      .catch((error) => {
        console.log(error);
        setColor(theme.text.orange);
      });

    fetchLastEps();
    fetchThreeTrending();
    setIsLoading(false);
  }, [color]);

  if (isLoading || !lastEps || !dataHeader) {
    return <Loader />;
  }
    
  return (
    <div>
      <Navbar />
      <Header color={color} data={dataHeader} />
      <LastEps data={lastEps} />
      <Trends />
      <NewsSeasons />
      <Footer />
    </div>
  );
};
export default HomePage;
