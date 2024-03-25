import { createTheme, ThemeProvider } from "@mui/material"
import { CssBaseline } from "@mui/material"
import App from "./App"

const Theme = () => {
    const theme = createTheme(
        {
            palette: {
                text: {
                    primary: "#ffffff",
                    secondary: "#000000",
                    orange: "rgba(236, 149, 18, 1)",
                    grey: "#A5A5A5"
                },
                background: {
                    default: "#000000",
                    secondary: "#121212",
                    episodeHover: "rgba(249, 249, 249, 0.79)",
                    episodeWatched: "rgba(66, 66, 66, 0.79)",
                    episodeDefault: "rgba(0, 0, 0, 0.9)",
                    episode: "rgba(0, 0, 0, 0.81)",
                    input: "#424242",
                },
                buttons: {
                    primary: "rgba(79, 79, 79, 1)",
                    secondary: "#4F4F4F",
                },
                tags: {
                    primary: "#636363",
                    vf: "rgba(226, 0, 0, 0.78)",
                    season: "rgba(99, 99, 99, 0.78)",
                    episode: "rgba(19, 19, 19, 0.83)",
                },
                nav: {
                    primary: "rgba(0, 0, 0, 0.61)",
                },
            }
        }
    )
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Réinitialise les styles CSS de base pour une meilleure cohérence */}
            <App />
        </ThemeProvider>
    )
}
export default Theme;