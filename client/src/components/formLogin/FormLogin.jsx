import React, { useState } from 'react';

import { TextField, Button, Link } from '@mui/material';

import './FormLogin.scss';

function FormLogin() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div className='form-login'>
      <form
        // onSubmit={sendLogin} 
        className="w-50">
        <div className="mb-6">
          <TextField
            required
            type="email"
            onChange={updateData}
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
            onChange={updateData}
            name="password"
            label="Mot de passe"
            variant="outlined"
            className="w-full"
          />
        </div>

        {error && <div className="text-red-500 text-sm my-3">{error}</div>}

        <div className="mb-3">
          Vous n'avez pas de compte ?{' '}
          <Link to={'/signup'} className="text-blue-600 hover:underline">
            Inscrivez-vous
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

        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;