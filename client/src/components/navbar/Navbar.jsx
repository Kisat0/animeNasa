import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import "./Navbar.scss";
import Searchbar from "../searchbar/Searchbar";
import { useAuth } from "../../utils/AuthContext";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Navbar = () => {
  const theme = useTheme().palette;
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);
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
          <StyledLink to="/search">Rechercher</StyledLink>
        </li>
        <li>
          <StyledLink to="/news">News</StyledLink>
        </li>
        <li>
          <StyledLink to="/calendar">Calendrier</StyledLink>
        </li>
        <li>
          <StyledLink to="/contact">Contact</StyledLink>
        </li>
        <li>
          <StyledLink to="">Discord</StyledLink>
        </li>
        {!isLoggedIn && (
          <li>
            <StyledLink to="/login">Connexion</StyledLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
