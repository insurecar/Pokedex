import React, { useState, useEffect } from "react";
import axios from "axios";
import { colors } from "./colors";

const Pokemon = ({ pokemon, showDetal }) => {
  const pokemonCharecters = {
    id: [],
    name: "",
    types: [],
    characters: [],
    weight: 0,
  };

  const { url, name } = pokemon;
  const [data, setData] = useState(pokemonCharecters);
  const { id, types } = data;

  useEffect(() => {
    encounterPokemon(url);
  }, [url]);

  const encounterPokemon = (url) => {
    axios.get(url).then((response) => {
      const { stats, types, id, name, weight } = response.data;
      setData({
        characters: stats.map((el) => el.base_stat),
        types: types.map((el) => el.type.name),
        id,
        weight,
        name,
      });
    });
  };

  return (
    <div className="goods__items">
      <div className="goods__items-logo" onClick={() => showDetal(data)}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt="дракон"
          width="100%"
        />
      </div>
      <span className="pokemon-name">{name}</span>
      <div className="pokemon-color">
        {types.map((el, i) => {
          return (
            <span key={i} className="pokemon-color__item" style={{ background: `${colors[el]}` }}>
              {el}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
