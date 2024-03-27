import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button } from '@mui/material';

import './FormLogin.scss';

function FormLogin() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendLogin = async (event) => {
    event.preventDefault();

    console.log(data);
    await fetch(`http://localhost:5001/users/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        return {
          status: response.status,
          data: await response.json(),
        };
      })
      .then(({ status, data }) => {
        if (status == 200) {
          console.log(data);
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          setError(data.message);
        }
      });
  };
  
  return (
    <div className='div-form-login'>
      <form
        onSubmit={sendLogin} 
        className="form-login">
        <div className="mb-6">
          <TextField
            required
            type="identifier"
            onChange={updateData}
            name="identifier"
            label="Email or Username"
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
          <Link to={'/signup'} className="link">
            Inscrivez-vous
          </Link>
        </div>

        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;