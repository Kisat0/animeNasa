import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import "./FormSignup.scss";
import { useAuth } from "../../utils/AuthContext";
import { toastFail, toastSuccess } from "../../utils/toasts";
import axios from "axios";

function FormSignup() {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuth();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendSignup = async () => {
    if (!mail || !username || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_API_ADDRESS}/users/register`, {
        userMail: mail,
        userName: username,
        userPassword: password,
      })
      .then((response) => {
        if (response.status === 200) {
          toastSuccess("Compte créé avec succès");
          loginUser(mail, password);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toastFail(`${error.response.data.message}`);
        }
      });
  };

  return (
    <div className="div-form-signup">
      <form onSubmit={sendSignup} className="w-50">
        <div className="mb-6">
          <TextField
            required
            type="username"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            label="Username"
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <TextField
            required
            type="email"
            onChange={(e) => setMail(e.target.value)}
            name="email"
            label="Email"
            variant="outlined"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <TextField
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Mot de passe"
            variant="outlined"
            className="w-full"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="mb-3">
          Vous avez déjà un compte ?{" "}
          <Link to={"/login"} className="link">
            Connectez vous
          </Link>
        </div>

        {/* <div className="my-3">
          <Link
            to={'/password-reset-request'}
            className="text-blue-600 hover:underline"
          >
            Mot de passe oublié
          </Link>
        </div> */}

        <Button type="submit" variant="contained" onClick={sendSignup}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;
