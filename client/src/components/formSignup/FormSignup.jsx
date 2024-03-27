import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import './FormSignup.scss';

function FormSignup() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  const sendSignup = async (event) => {
    event.preventDefault();

    console.log(data);

    await fetch("http://localhost:5001/users", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        return {
          status: response.status,
          result: await response.json(),
        };
      })
      .then(({ status, result }) => {
        if (status !== 201) {
          setError(result.message);
        } else {
          navigate('/');
        }
      });
  };

  return (
    <div className='div-form-signup'>
      <form
        onSubmit={sendSignup} 
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

        {error && <div className="error">{error}</div>}

        <div className="mb-3">
          Vous avez déjà un compte ?{' '}
          <Link to={'/login'} className="link">
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