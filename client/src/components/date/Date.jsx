import React from 'react';
import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française
import "./Date.scss"

function Date() {
  // Définir la locale française
  moment.locale('fr');

  let currentDate = moment().format('dddd D MMMM YYYY');

  return (
    <div className='calendar-date'>
      <h1>{currentDate}</h1>
    </div>
  );
}

export default Date;