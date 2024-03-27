import FormLogin from "../../components/formLogin/FormLogin";
import "./Login.scss";

import { ThemeProvider, createTheme } from "@mui/material";

const Login = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="white">
      <h1 className="login-title">Connectez-vous</h1>
      <div className="containeur-form-login">
        <ThemeProvider theme={darkTheme}>
          <FormLogin />
        </ThemeProvider>
      </div>
    </div>
  )
}
export default Login; 