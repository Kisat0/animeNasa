import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material";
import "./Navbar.scss";
import { useAuth } from "../../utils/AuthContext";
import { DiscordIcon } from "../../utils/DiscordIcon";
const StyledLink = styled(Link)(({ theme,color }) => ({
  color: theme.palette.text.primary,

  "&:hover": {
    color: color ? color : theme.palette.primary.main,
  },
}));

const Navbar = ({ color }) => {
  const theme = useTheme().palette;
  const { isLoggedIn } = useAuth();

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
          <StyledLink to="/" color={color}>
            Accueil
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/search" color={color}>
            Rechercher
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/news" color={color}>
            News
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/calendar" color={color}>
            Calendrier
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/contact" color={color}>
            Contact
          </StyledLink>
        </li>
        <li>
          <DiscordIcon color={color} />
        </li>
        {!isLoggedIn && (
          <li>
            <StyledLink to="/login" color={color}>
              Connexion
            </StyledLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
