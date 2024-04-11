import Navbar from "../../components/navbar/Navbar";
import Results from "../../components/results/Results";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Search.scss";

const SearchPage = () => {

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Results />
    </div>
  );
};
export default SearchPage;
