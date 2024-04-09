import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import "./FormLogin.scss";
import { toastFail, toastSuccess } from "../../utils/toasts";
import { useAuth } from "../../utils/AuthContext";

function FormLogin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const sendLogin = async () => {
    if (!mail || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    const { success, error } = await loginUser(mail, password);
    if (!success) {
      setError(error.data.message);
      toastFail("Connexion échouée");
      return;
    }

    navigate("/");
    toastSuccess("Connexion réussie");
  };

  return (
    <div className="div-form-login">
      <form className="form-login">
        <div className="mb-6">
          <TextField
            required
            type="identifier"
            onChange={(e) => setMail(e.target.value)}
            name="identifier"
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

        {error && <div className="text-red-500 text-sm my-3">{error}</div>}

        <div className="mb-3">
          Vous n'avez pas de compte ?{" "}
          <Link to={"/signup"} className="link">
            Inscrivez-vous
          </Link>
        </div>

        <Button variant="contained" onClick={sendLogin}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;
