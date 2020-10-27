import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import Details from "./Details";

function App() {
  const [wildPokemon, setWildPokemon] = useState([]);
  const [details, setDetails] = useState({});
  let [limit, setLimit] = useState(20);
  useEffect(() => {
    fetchPockemonData(limit);
  }, [limit]);

  const fetchPockemonData = (limit) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`).then((response) => {
      setWildPokemon(response.data.results);
    });
  };

  const showDetal = (data) => {
    setDetails(data);
  };

  let showMorePokemon = () => {
    setLimit(limit + 20);
  };

  return (
    <div className="container">
      <div className="goods">
        {wildPokemon.map((pokemon, i) => {
          return <Pokemon pokemon={pokemon} key={i} showDetal={showDetal} />;
        })}
        <button type="submit" className="load-more" onClick={showMorePokemon}>
          LOAD More
        </button>
      </div>
      <div className="details__block">{Object.keys(details).length ? <Details {...details} /> : null}</div>
    </div>
  );
}

export default App;
