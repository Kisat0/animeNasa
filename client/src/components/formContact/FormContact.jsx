import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { TextField, Button } from '@mui/material';


import './FormContact.scss';

function FormContact() {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  
  return (
    <div>
      <div className='div-form-contact'>
        <form  className="form-contact">
          <div className="">
            <TextField
              required
              type="identifier"
              onChange={updateData}
              name="object"
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

          {error && <div className="AAAA">{error}</div>}

          <Button type="submit" variant="contained">
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FormContact;
