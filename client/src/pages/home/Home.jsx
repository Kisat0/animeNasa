import Header from "../../components/header/Header";
import LastEps from "../../components/lastEps/LastEps";
import Navbar from "../../components/navbar/Navbar";
import NewsSeasons from "../../components/newsSeasons/NewsSeasons";
import Trends from "../../components/trends/Trends";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <LastEps />
            <Trends />
            <NewsSeasons/>
        </div>
    )
}
export default Home;