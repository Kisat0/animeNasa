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
    <h1 className="login-title">Inscrivez-vous</h1>
      <div className="containeur-form-signup">

        <ThemeProvider theme={darkTheme}>
          <FormSignup />
        </ThemeProvider>
      </div>
    </div>
  )
}
export default Signup; 