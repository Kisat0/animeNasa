import weekDays from "../../utils/Week";


function ReleasesCard() {
  return (
    <div>
      <h2>Mon planning hebdomadaire</h2>
      <ul>
        {weekDays.map((jour) => (
          <li key={jour.id}>
            <h3>{jour.name}</h3>
            {/* Ajoutez ici le contenu de votre planning pour chaque jour */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReleasesCard;