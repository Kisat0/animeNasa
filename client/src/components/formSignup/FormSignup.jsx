import React, { useState } from 'react';

import { TextField, Button, Link } from '@mui/material';

import './FormSignup.scss';

function FormSignup() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
    <div className='form-signup'>
      <form
        // onSubmit={sendSignup} 
        className="w-50">
        <div className="mb-6">
          <TextField
            required
            type="username"
            onChange={updateData}
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

        <div className="my-3">
          Vous avez déjà un compte ?{' '}
          <Link to={'/login'} className="text-blue-600 hover:underline">
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

        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;