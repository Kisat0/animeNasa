import weekDays from "../../utils/Week";
import "./ReleasesCard.scss";


function ReleasesCard() {
  return (
    <div>
      <div className="releases">
        {weekDays.map((each) => (
          <div key={each.id} className="day">
            <h3>{each.name}</h3>
            {each.releases.map((release, index) => (
              <div key={index} className={index + 1}>
                <img src={release} className="img" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReleasesCard;