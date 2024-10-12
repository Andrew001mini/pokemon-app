import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [search, setSearch] = useState('');

  // Fetching Pokémon data from the API
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const data = await response.json();
      const pokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
          };
        })
      );
      setPokemons(pokemonList);
      setFilteredPokemons(pokemonList); // Initially display all Pokémon
    };

    fetchPokemons();
  }, []);

  // Filtering Pokémon based on search input
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={handleSearch}
        className="search-box"
      />
      <div className="pokemon-container">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.image} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
            </div>
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
}

export default App;
