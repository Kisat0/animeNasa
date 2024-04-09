import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

import './FormSignup.scss';
import { useAuth } from '../../utils/AuthContext';
import { toastFail, toastSuccess } from '../../utils/toasts';

function FormSignup() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useAuth();

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const sendSignup = async (event) => {
    const { success, error } = await loginUser(mail, password);
    if (success) {
      toastSuccess('Vous êtes connecté');
      navigate('/');
    } else {
      setError(error);
      toastFail('Une erreur s\'est produite');
    }
    
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
            onChange={() => setMail(event.target.value)}
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
            onChange={() => setPassword(event.target.value)}
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

        <Button type="submit" variant="contained" onClick={sendSignup}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default FormSignup;