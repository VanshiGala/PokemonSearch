import React, { useState, useRef, useEffect } from "react";

function Poke() {
  let [pokemon, setPokemon] = useState("");
  let [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");
  let inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  let fetchPokemon = async () => {
    try {
      const poke = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      const res = await poke.json();
      setPokemonData(res);
      console.log(res);
      if (pokemon === "") {
        alert("Enter a valid pokemon name");
        setPokemonData(null);
      } else {
        console.log(res);
      }
    } catch (error) {
      setError("Pokemon not found");
    }
  };
  const searchPokemon = () => {
    fetchPokemon();
    setPokemon("");
    setError("");
  };
  return (
    <div className="bg-pink-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 text-center mb-10">
        <input
          type="text"
          placeholder="Enter the pokemon name"
          ref={inputRef}
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
          className="border border-black p-1 rounded-md"
        />
        <button
          onClick={searchPokemon}
          className="cursor-pointer p-4 mt-12 hover:bg-blue-100"
        >
          Search
        </button>
        {pokemonData && (
          <>
            <h3 className="text-2xl font-bold text-center mt-8 mr-8">
              {pokemonData.name.toUpperCase()}
            </h3>
            <div className="flex justify-center items-center ">
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="w-100 h-100 mb-6 item-center justify-center"
              />
            </div>
          </>
        )}
        {error && (
          <>
            <h3 className="text-xl font-bold">{error}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default Poke;
