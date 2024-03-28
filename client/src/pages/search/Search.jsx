import Navbar from "../../components/navbar/Navbar";
import Results from "../../components/results/Results";
import Searchbar from "../../components/searchbar/Searchbar";
import "./Search.scss";

import { ThemeProvider, createTheme } from "@mui/material";

const Search = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={darkTheme}>
        <Searchbar />
        <Results />
      </ThemeProvider>
    </div>
  )
}
export default Search; 