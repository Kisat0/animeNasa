import SerieDetails from "../../components/serieDetails/SerieDetails";
import "./Summary.scss"

const Summary = () => {
    return (
        <div className="SerieComponent">
            <SerieDetails />
            <SerieDetails />
            <SerieDetails />
        </div>
    );
}
export default Summary;