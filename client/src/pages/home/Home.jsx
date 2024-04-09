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


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastEps, setLastEps] = useState([]);
    const [color, setColor] = useState();
    
    const theme = useTheme().palette;

  useEffect(() => {
    const fetchLastEps = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_ADDRESS}/episodes/latest/${0}`
        );
        const data = await res.json();
        setLastEps(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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
  }, [color]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <Header color={color} />
      <LastEps data={lastEps} />
      <Trends />
      <NewsSeasons />
      <Footer />
    </div>
  );
};
export default HomePage;
