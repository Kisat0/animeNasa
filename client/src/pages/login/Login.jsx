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
      <h1>Login</h1>
      <div className="containeur-login">

        <ThemeProvider theme={darkTheme}>
          <FormLogin />
        </ThemeProvider>
      </div>
    </div>
  )
}
export default Login; 