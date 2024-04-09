import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const sendEmailContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/connection/contactEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
       
      });
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(`Un email a été envoyé à ${responseData.email}`);
      } else {
        const responseData = await response.json();
        setError(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
    }
  };

  return (
    <div>
      <div className='div-form-contact'>
        <form className="form-contact" onSubmit={sendEmailContact}>
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

          {error && <div className="errorMessage">{error}</div>}
          {successMessage && <div className="successMessage">{successMessage}</div>}

          <Button type="submit" variant="contained">
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormContact;
