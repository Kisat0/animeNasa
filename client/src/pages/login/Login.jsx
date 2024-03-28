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
      <img src="https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/1612118642528-NNKDQ94C5US2B4KZEO2V/Naruto17.jpg" className="background login-background" />
    </div>
  )
}
export default Login; 