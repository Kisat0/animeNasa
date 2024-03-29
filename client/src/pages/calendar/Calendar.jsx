import Navbar from "../../components/navbar/Navbar";
import Date from "../../components/date/Date";

import "./Calendar.scss";
import ReleasesCard from "../../components/releasesCard/ReleasesCard";

const CalendarPage = () => {
  return (
    <div>
      <Navbar />
      <div className="calendar-container">
        <Date />
      </div>
      <ReleasesCard />
    </div>
  )
}
export default CalendarPage; 