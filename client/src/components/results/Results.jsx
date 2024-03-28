import React, { useState, useEffect } from "react";

import "./Results.scss";

function Results({ data, animes }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (animes) {
      setResults(animes);
      console.log(animes);
    }
    if (data && data.search && data.search.length > 0) {
      setResults(animes.filter((anime) =>
        anime.title.toLowerCase().includes(data.search.toLowerCase())
      ));
      console.log(results);
    }
  }, [data, animes]); 

  return (
    <div className="results">
      {results.map((result) => (
        <div key={result._id} className="each-result">
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
