import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import "./Navbar.scss";
import Searchbar from "../searchbar/Searchbar";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Navbar = () => {
  const theme = useTheme().palette;
  return (
    <nav
      style={{
        backgroundColor: theme.nav.primary,
      }}
    >
      <StyledLink to="/" className="logo">
        AnimeNation
      </StyledLink>
      
      <ul>
        <li>
          <StyledLink to="/">Accueil</StyledLink>
        </li>
        <li>
          <StyledLink to="">News</StyledLink>
        </li>
        <li>
          <StyledLink to="/calendar">Calendrier</StyledLink>
        </li>
        <li>
          <StyledLink to="">Contact</StyledLink>
        </li>
        <li>
          <StyledLink to="">Discord</StyledLink>
        </li>
        <li>
          <StyledLink to="/login">Connexion</StyledLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
