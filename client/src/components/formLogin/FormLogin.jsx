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

  const sendLogin = async (event) => {
    event.preventDefault();

    console.log(data);

    // await fetch(`/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(async (response) => {
    //     return {
    //       status: response.status,
    //       data: await response.json(),
    //     };
    //   })
    //   .then(({ status, data }) => {
    //     if (status == 200) {
    //       localStorage.setItem('token', data.token);
    //       navigate('/');
    //     } else {
    //       setError(data.message);
    //     }
    //   });
  };
  
  return (
    <div className='div-form-login'>
      <form
        onSubmit={sendLogin} 
        className="form-login">
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

        <Button type="submit" variant="contained">
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormLogin;