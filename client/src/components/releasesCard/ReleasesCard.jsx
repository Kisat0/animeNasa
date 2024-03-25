import weekDays from "../../utils/Week";
import "./ReleasesCard.scss";


function ReleasesCard() {
  return (
    <div>
      <div className="releases">
        {weekDays.map((each) => (
          <div key={each.id}>
            <h3>{each.name}</h3>
            {each.releases.map((release, index) => (
              <div key={index} className={index + 1}>
                <image src={release}>{release}</image>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReleasesCard;