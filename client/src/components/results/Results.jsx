import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import "./Results.scss";

function Results({ data, animes }) {
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (animes ) {
      setResults(animes);
    }
    if (data && data.search && data.search.length > 0) {
      setResults(animes.filter((anime) =>
        anime.title.toLowerCase().includes(data.search.toLowerCase())
      ));
    }
  }, [data, animes]); 

  return (
    <div className="results">
      {results.map((result) => (
        <div key={result._id} className="each-result" onClick={() => navigate(`/summary/${result._id}`)}>
          <img src={result.poster} alt="" />
          <span className="result-text">
            {result.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Results;
