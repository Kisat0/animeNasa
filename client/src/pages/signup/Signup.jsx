import FormSignup from "../../components/formSignup/FormSignup";
import "./Signup.scss";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const SignupPage = () => {
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
      <img src="https://wallpapercave.com/wp/wp8994577.jpg" className="background login-background" />
    </div>
  )
}
export default SignupPage; 