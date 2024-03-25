import Navbar from "../../components/navbar/Navbar";
import Date from "../../components/date/Date";

import "./Calendar.scss";

const Calendar = () => {
  return (
    <div>
      <Navbar />
      <div className="calendar-container">
        <Date />
      </div>
    </div>
  )
}
export default Calendar; 