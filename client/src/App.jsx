import Router from "./Routes";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
