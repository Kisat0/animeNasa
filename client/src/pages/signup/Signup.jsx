import FormSignup from "../../components/formSignup/FormSignup";
import "./Signup.scss";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const Signup = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="white">
      <h1>Signup</h1>
      <div className="containeur-signup">

        <ThemeProvider theme={darkTheme}>
          <FormSignup />
        </ThemeProvider>
      </div>
    </div>
  )
}
export default Signup; 