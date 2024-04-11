import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Searchbar.scss";
import Results from "../results/Results";

function Searchbar() {
  var json = require("../../utils/fr.json");
  const [data, setData] = useState({});
  const [animes, setAnimes] = useState([]);

  const updateData = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/animes`
        );
        setAnimes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div className="searchbar-container">
      <input
        className="input"
        type="text"
        name="search"
        placeholder={json.search}
        onChange={updateData}
      />
      <Results data={data} animes={animes} />
    </div>
  );
}

export default Searchbar;
