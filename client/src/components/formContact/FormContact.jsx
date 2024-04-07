import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button } from '@mui/material';


import './FormContact.scss';

function FormContact() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSuccessMessage('Votre message s\'est bien envoyé');
      } else {
        setError('Une erreur s\'est produite lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Une erreur s\'est produite lors de l\'envoi du message.');
    }
  };

  
  return (
    <div>
      <div className='div-form-contact'>
        <form  className="form-contact" onSubmit={handleSubmit}> 
          <div className="">
            <TextField
              required
              type="identifier"
              onChange={updateData}
              name="title"
              label="Objet"
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="">
            <TextField
              required
              onChange={updateData}
              name="corps"
              label="Corps du message"
              className="w-full" 
              multiline={true}
              rows={6} 
              variant="outlined"
            />
          </div>

          {error && <div className="successMessage">{error}</div>}

          <Button type="submit" variant="contained">
            Envoyer
          </Button>
        </form>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default FormContact;
